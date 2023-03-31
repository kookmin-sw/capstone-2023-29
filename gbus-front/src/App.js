import React from 'react';
import Header from "./components/Header.js"
import SearchForm from './components/SearchForm.js';
import SearchResult from './components/SearchResult.js';
import store from './Store.js'
import Tabs, {TabType} from './components/Tabs.js';
import KeywordList from './components/KeywordList.js';
import HistoryList from './components/HistoryList.js';


export default class App extends React.Component {
    constructor(){
        super();

        this.state={
            searchKeyword:"",
            searchResult:[],
            submitted: false,
            selectedTab: TabType.KEYWORD,
        };
    }

    handleChangeInput(searchKeyword){
        if(searchKeyword.length <= 0) {
            this.handleReset();
        }
        this.setState({searchKeyword});
    }

    search(searchKeyword){
        const searchResult = store.search(searchKeyword);

        this.setState({
            searchResult,
            submitted: true,
        })
    }

    handleReset(){
        this.setState({
            searchKeyword:"",
            submitted: false,
             searchResult:[]
        });
    }

    render() {
        const{searchKeyword, submitted, searchResult, selectedTab} = this.state;

        return (
        <>
            <Header title="자리있어?"/>
            <div className="container">
                <SearchForm 
                value = {searchKeyword}
                onChange = {(value)=> this.handleChangeInput(value)}
                onSubmit={() => this.search(searchKeyword)}
                onReset={()=> this.handleReset()}
            />
            <div className="content">
                {submitted ? (
                <SearchResult data={searchResult} storage={storage}/>
                 ) :(
                <>
                    <Tabs 
                        selectedTab={selectedTab} 
                        onChange={(selectedTab) => this.setState({selectedTab})}
                    />
                    {selectedTab === TabType.KEYWORD && (
                        <KeywordList storage={storage} onClick={keyword => this.search(keyword)}/>
                    )}
                    {selectedTab === TabType.HISTORY && (
                        <HistoryList storage={storage} onClick={keyword => this.search(keyword)}/>
                    )}
                </>
                )}
            </div>
            {/* <div className="content">
                <BusDetail storage={storage} />
            </div> */}
            </div>
        </>
        );
        }

    }




    const storage = {
        keywordData: [
          { id: 1, keyword: "1300" },
          { id: 2, keyword: "7700" },
          { id: 3, keyword: "9100" },
        ],
      
        historyData: [],
      
        productData: [
          {
            id: 0,
            name: "1300",
            busStop: ["힐스테이트레이크송도2차(201동)", "힐스테이트레이크송도1차입구","송담초등학교",
            "e편한세상정문","랜드마크시티센트럴더샵"],
            percent: [100,80,60,40,20],
            bookMark: false
          },
          {
            id: 1,
            name: "1301",
            busStop : ["ㄱ","ㄴ","ㄷ"],
            percent: [100,80,60],
            bookMark:false,
          },
          {
            id: 2,
            name: "1302",
            busStop : ["ㄱ","ㄴ","ㄷ"],
            percent: [100,80,60],
            bookMark:false,
          },
          {
            id: 3,
            name: "1601",
            busStop : ["ㄱ","ㄴ","ㄷ"],
            percent: [100,80,60],
            bookMark:false,
          },
          {
            id: 4,
            name: "7700",
            busStop : ["ㄱ","ㄴ","ㄷ"],
            percent: [100,80,60],
            bookMark:false,
          },
          {
            id: 5,
            name: "9100",
            busStop : ["ㄱ","ㄴ","ㄷ"],
            percent: [100,80,60],
            bookMark:false,
          },
          {
            id: 6,
            name: "9200",
            busStop : ["ㄱ","ㄴ","ㄷ"],
            percent: [100,80,60],
            bookMark:false,
          },
        ],
      };

      