import React, { Component } from "react";
import TruncatedTableCell from "../Table";
import "./index.css";
import MonthlyBarChart from "../Chart";

const monthList = [
  { text: "January", id: 0 },
  { text: "February", id: 1 },
  { text: "March", id: 2 },
  { text: "April", id: 3 },
  { text: "May", id: 4 },
  { text: "June", id: 5 },
  { text: "July", id: 6 },
  { text: "August", id: 7 },
  { text: "September", id: 8 },
  { text: "October", id: 9 },
  { text: "November", id: 10 },
  { text: "December", id: 11 },
];

class Home extends Component {
  state = {
    selectedMonth: monthList[2].id,
    allProductData: [],
    searchedInput: "",
    currentPage: 1,
    itemsPerPage: 10,
    pieChartData: [],
    priceRangeData: [],
    staticsData: [],
  };

  componentDidMount() {
    this.getData();
    this.getTableData();
  }

  getTableData = async () => {
    const response = await fetch("http://localhost:9000/");
    const data = await response.json();
    this.setState({ allProductData: data });
  };

  onChangeMonth = (event) => {
    this.setState(
      { selectedMonth: parseInt(event.target.value), currentPage: 1 },
      this.getData
    );
  };

  onChangeSearchInput = (event) => {
    this.setState({ searchedInput: event.target.value });
  };

  getData = async () => {
    const { selectedMonth } = this.state;
    const response = await fetch(
      `http://localhost:9000/combined-api/?month=${selectedMonth}`
    );
    const datas = await response.json();
    this.setState({
      pieChartData: datas.pieChartData,
      priceRangeData: datas.priceRanges,
      staticsData: datas.statics,
    });
  };

  filterSalesByMonth = (data, targetMonth) => {
    return data.filter((sale) => {
      const date = new Date(sale.dateOfSale);
      const month = date.getMonth();
      return month === targetMonth;
    });
  };

  onNextPage = () => {
    this.setState((prevState) => ({
      currentPage: prevState.currentPage + 1,
    }));
  };

  onPreviousPage = () => {
    this.setState((prevState) => ({
      currentPage: prevState.currentPage - 1,
    }));
  };

  render() {
    const {
      selectedMonth,
      allProductData,
      searchedInput,
      pieChartData,
      priceRangeData,
      staticsData,
      currentPage,
      itemsPerPage,
    } = this.state;

    const maxTextLength = 20;

    const getProductData = this.filterSalesByMonth(
      allProductData,
      selectedMonth
    );

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentProductData = getProductData.slice(
      indexOfFirstItem,
      indexOfLastItem
    );

    const productData = currentProductData.filter((each) =>
      each.title.toLowerCase().includes(searchedInput)
    );

    const totalPages = Math.ceil(getProductData.length / itemsPerPage);
    const hasNextPage = currentPage < totalPages;
    const hasPreviousPage = currentPage > 1;

    // Table header
    const tableHeader = (
      <thead>
        <tr>
          <th>ID</th>
          <th>Title</th>
          <th>Description</th>
          <th>Price</th>
          <th>Category</th>
          <th>Sold</th>
          <th>Image</th>
        </tr>
      </thead>
    );

    // Table body
    const tableBody = (
      <tbody>
        {productData.map((item) => (
          <tr key={item.id}>
            <TruncatedTableCell text={item.id} maxLength={maxTextLength} />
            <TruncatedTableCell
              text={item.title}
              maxLength={maxTextLength}
            />
            <TruncatedTableCell
              text={item.description}
              maxLength={maxTextLength}
            />
            <TruncatedTableCell text={item.price} maxLength={maxTextLength} />
            <TruncatedTableCell
              text={item.category}
              maxLength={maxTextLength}
            />
            <TruncatedTableCell text={item.sold} />
            <TruncatedTableCell
              text={item.image}
              maxLength={maxTextLength}
            />
          </tr>
        ))}
      </tbody>
    );

    // Render the table
    return (
      <div className="bg-container">
        <div className="header-container">
          <h1 className="header">Transaction Dashboard</h1>
        </div>
        <div className="table-container">
          <div className="search-dropdown-container">
            <input
              type="search"
              placeholder="Search transaction"
              className="search-bar"
              value={searchedInput}
              onChange={this.onChangeSearchInput}
            />
            <select
              value={selectedMonth}
              className="select"
              onChange={this.onChangeMonth}
            >
              {monthList.map((eachMonth) => (
                <option value={eachMonth.id} key={eachMonth.id}>
                  {eachMonth.text}
                </option>
              ))}
            </select>
          </div>
          <table className="table">
            {tableHeader}
            {tableBody}
          </table>
          <div className="pagination-container">
            <h1 className="page-no">Page No: {currentPage}</h1>
            <div className="next-prev-container">
              {hasPreviousPage && (
                <button onClick={this.onPreviousPage}>Previous</button>
              )}
              {hasNextPage && <button onClick={this.onNextPage}>Next</button>}
            </div>
            <h1 className="page-no">Per Page: {itemsPerPage}</h1>
          </div>
        </div>
        <h1 className="side-header">
          Statics - {monthList[selectedMonth].text}
        </h1>
        <div className="statics-container">
          <div className="stats-container">
            <div className="total-sale-container">
              <p className="side-name">Total sale</p>
              <p className="count">{staticsData.totalSale}</p>
            </div>
            <div className="total-sale-container">
              <p className="side-name">Total sold item</p>
              <p className="count">{staticsData.totalSoldItem}</p>
            </div>
            <div className="total-sale-container">
              <p className="side-name">Total not sold item</p>
              <p className="count">{staticsData.totalNotSoldItem}</p>
            </div>
          </div>
        </div>
        <h1 className="side-header">
          Bar Chart Stats - {monthList[selectedMonth].text}
        </h1>

        <MonthlyBarChart productData={priceRangeData} />
      </div>
    );
  }
}


export default Home;
