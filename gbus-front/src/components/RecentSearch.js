import { useSelector } from "react-redux";

function RecentSearch(){

    let recentSearch = useSelector((state)=>{return state.recentSearch})
    console.log(recentSearch)

    return(
        <div>최근검색어</div>
    )
}
export default RecentSearch;