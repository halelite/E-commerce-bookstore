import searchIcon from '../assets/icons/search_24dp_FILL0_wght400_GRAD0_opsz24.svg';
import { CustomSelect } from './Dropdown';

function Searchbar() {

    return (
        <div className="searchbar">
            <div className="custom-select">
                <CustomSelect />
            </div>
            <div className="divider"></div>
            <input type="text" placeholder='جستجو...' className="searchInput"/>
            <div className="search-btn">
                <img src={searchIcon} alt="search" />
            </div>
        </div>
    )
}

export default Searchbar