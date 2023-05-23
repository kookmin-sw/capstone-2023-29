import os
import glob
import pandas as pd

import torch
import torch.nn as nn
import torch.optim as optim
from torch.utils.data import DataLoader, TensorDataset
from sklearn.model_selection import train_test_split
import pandas as pd
import numpy as np

# Specify the directory you want to use
directory = '####DATA Directory####'

# Use glob to match the pattern 'csv'
files = glob.glob(os.path.join(directory, "*.csv"))

# Model initialization and hyperparameters
hidden_size = 64
input_size = 6
num_layers = 5
dropout = 0.1
learning_rate = 0.0001
n_epochs = 20
n_steps = 5
output_size = 1
window_size = 5

# Sequence data creation function
def create_sequences(data, labels, window_size, n_steps):
    seq_data = []
    seq_labels = []
    for i in range(len(data) - window_size - n_steps + 1):  # Need to stop 'n_steps' earlier
        seq_data.append(data[i : i + window_size])
        seq_labels.append(labels[i + window_size : i + window_size + n_steps])  # Create a sequence of 'n_steps' labels
    return np.array(seq_data), np.array(seq_labels)

# LSTM Model
class LSTMModel(nn.Module):
    def __init__(self, input_size, hidden_size, num_layers, dropout, n_steps, output_size):
        super(LSTMModel, self).__init__()
        self.hidden_size = hidden_size
        self.num_layers = num_layers

        # LSTM layers
        self.lstm1 = nn.LSTM(input_size, hidden_size, num_layers, batch_first=True, dropout=dropout)
        self.lstm2 = nn.LSTM(hidden_size, hidden_size, num_layers, batch_first=True, dropout=dropout)
        
        # Fully connected layer
        self.fc = nn.Linear(hidden_size, n_steps * output_size)

    def forward(self, x):
        batch_size = x.size(0)

        # Initialize hidden state and cell state for lstm1
        h0 = torch.zeros(self.num_layers, batch_size, self.hidden_size).to(device)
        c0 = torch.zeros(self.num_layers, batch_size, self.hidden_size).to(device)

        out, (h_n, c_n) = self.lstm1(x, (h0.detach(), c0.detach()))
        out, _ = self.lstm2(out, (h_n, c_n))

        # Pass the output of the LSTM layers through the fully connected layer
        out = self.fc(out[:, -1, :])
        out = out.view(batch_size, n_steps, output_size)

        return out
    
for file in files:
    data = pd.read_csv(file)
    file_name = os.path.splitext(os.path.basename(file))[0]

    data = data.sort_values(by=['plate_no', 'date_time', 'station_order'])
    features = data[['station_order', 'hour', 'min', 'day_of_week', 'plateType', 'is_weekend']].values
    labels = data['remaining_seats'].values

    # Split the data into training and test sets
    X_train, X_test, y_train, y_test = train_test_split(features, labels, test_size=0.2, shuffle=False)

    # Update sequence creation to include 'n_steps'
    X_train, y_train = create_sequences(X_train, y_train, window_size, n_steps)
    X_test, y_test = create_sequences(X_test, y_test, window_size, n_steps)

    # Convert to PyTorch Tensor
    X_train = torch.tensor(X_train, dtype=torch.float32)
    X_test = torch.tensor(X_test, dtype=torch.float32)
    y_train = torch.tensor(y_train, dtype=torch.float32)
    y_test = torch.tensor(y_test, dtype=torch.float32)

    # Create DataLoader
    train_dataset = TensorDataset(X_train, y_train)
    test_dataset = TensorDataset(X_test, y_test)

    train_loader = DataLoader(train_dataset, batch_size=64, shuffle=True)
    test_loader = DataLoader(test_dataset, batch_size=64, shuffle=False)

    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    model = LSTMModel(input_size, hidden_size, num_layers, dropout, n_steps, output_size).to(device)
    criterion = nn.L1Loss()
    optimizer = optim.Adam(model.parameters(), lr=learning_rate)

    final_test_loss = 0
    print(f"{file_name}_training starts")
    # Model training
    for epoch in range(n_epochs):
        model.train()
        for batch_x, batch_y in train_loader:
            batch_x, batch_y = batch_x.to(device), batch_y.to(device)
            optimizer.zero_grad()
            output = model(batch_x)
            loss = criterion(output[:, -n_steps:].squeeze(), batch_y[:, -n_steps:])
            loss.backward()
            optimizer.step()

        # Evaluate test data
        model.eval()
        test_loss = 0
        with torch.no_grad():
            for batch_x, batch_y in test_loader:
                batch_x, batch_y = batch_x.to(device), batch_y.to(device)
                output = model(batch_x)
                loss = criterion(output[:, -n_steps:].squeeze(), batch_y[:, -n_steps:])
                test_loss += loss.item()

        test_loss /= len(test_loader)
        final_test_loss = test_loss
        print(f"Epoch: {epoch + 1}, Train Loss: {loss.item():.4f}, Test Loss: {test_loss:.4f}")
    
    model_path = f"./Service_model/{file_name}.pth"
    torch.save(model.state_dict(), model_path)
    
    with open('test_losses.txt', 'a') as file1:
        file1.write(f"{file_name}, {final_test_loss}\n")