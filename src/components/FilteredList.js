import React from 'react';
import './FilteredList.css';
import Nav from 'react-bootstrap/Nav';
import {useState } from "react";
import DisplayList from './DisplayList';
import Aggregator from './Aggregator';

export default function FilteredList(props) {

  const [checked, setChecked] = useState(false);

  const [state, setState] = useState({ type: "All" });

  const [res, setRes] = useState({ restrictions: "All" });

  const [sort, setSort] = useState({ type: "type" });

  const [cart, setCart] = useState([]);

  const [totalPrice, setTotalPrice] = useState(0);

  const addToCart = item => {
    setCart([...cart, item]);
    setTotalPrice(totalPrice + item.price);
  }

  const clearCart = () => {
    setCart([]);
    setTotalPrice(0);
  }

  const removeCart = removedItem => {
    if (cart.includes(removedItem)) {
      setCart(cart.filter(item => item !== removedItem));
      setTotalPrice(totalPrice - removedItem.price);
    } else {
      setCart(cart);
      setTotalPrice(totalPrice);
    }
  }

  const onSelectFilterType = event => {

    if (checked === false && state.type === "All") {
      setState({
        type: event
      })
      setChecked(true)
    } else if (checked === true && state.type === event) {
      setState({
        type: "All"
      })
      setChecked(false)
    } else {
      setState({
        type: event
      })
      setChecked(true)
    }
  };

  const matchesFilterType = item => {
    if (state.type === "All") {
      return true
    } else if (state.type === item.type) {
      return true
    } else {
      return false
    }
  };


  const onSelectFilterRes = event => {

    if (checked === false && res.restrictions === "All") {
      setRes({
        restrictions: event
      })
      setChecked(true)
    } else if (checked === true && res.restrictions === event) {
      setRes({
        restrictions: "All"
      })
      setChecked(false)
    } else {
      setRes({
        restrictions: event
      })
      setChecked(true)
    }
  };

  const matchesFilterRes = item => {
    // all items should be shown when no filter is selected
    if (res.restrictions === "All") {
      return true
    } else if (res.restrictions === item.restrictions) {
      return true
    } else {
      return false
    }
  };


  const onSelectSort = event => {

    if (checked === false && sort.type === "price") {
      setSort({
        type: event
      })
      setChecked(true)
    } else if (checked === true && sort.type === event) {
      setSort({
        type: "price"
      })
      setChecked(false)
    } else {
      setSort({
        type: event
      })
      setChecked(true)
    }
  };

  const matchesSortPrice = (a, b) => {

    if (sort.type === "price") {
      if (b.price < a.price) return 1;
      if (b.price > a.price) return -1;
      return 0;
    } else if (sort.type === "priceHigh") {
      if (b.price < a.price) return -1;
      if (b.price > a.price) return 1;
      return 0;
    } else if (sort.type === "calories") {
      if (b.calories < a.calories) return 1;
      if (b.calories > a.calories) return -1;
      return 0;
    } else if (sort.type === "pop") {
      if (b.pop < a.pop) return 1;
      if (b.pop > a.pop) return -1;
      return 0;
    } else {
      if (b.type < a.type) return 1;
      if (b.type > a.type) return -1;
      return 0;
    }

  }


  return (
    <div>
      <div className="left">
      <h1>HEYTEA</h1> 
        <Nav>
          <h3> Filter by </h3>
          <h4> Type </h4>

          <Nav.Item>
            <p><button className="button" onClick={() => setState({ type: "All" })}>Reset/All</button>
              <br></br></p>
          </Nav.Item>
          <Nav.Item>
            <p><button className="button" onClick={() => onSelectFilterType("cheezo fruit tea")}>Cheezo fruit tea</button>
              <br></br></p>
          </Nav.Item>
          <Nav.Item>
            <p><button className="button" onClick={() => onSelectFilterType("bobo milk tea")}>Bobo family</button>
              <br></br></p>
          </Nav.Item>
          <Nav.Item>
            <p><button className="button" onClick={() => onSelectFilterType("fruity boom")}>Fruity boom</button>
              <br></br></p>
          </Nav.Item>
          <Nav.Item>
            <p><button className="button" onClick={() => onSelectFilterType("coffee")}>Coffee savory</button>
              <br></br></p>
          </Nav.Item>
        </Nav>

        <Nav>
          <h4> Temperature </h4>
          <Nav.Item>
            <p><button className="button"  onClick={() => setRes({ restrictions: "All" })}>Reset/All</button>
              <br></br></p>
          </Nav.Item>

          <Nav.Item>
            <p><button className="button"  onClick={() => onSelectFilterRes("cold only")}>Cold only</button>
              <br></br></p>
          </Nav.Item>
          <Nav.Item>
            <p><button className="button" onClick={() => onSelectFilterRes("cold and hot")}>Cold and hot</button>
              <br></br></p>
          </Nav.Item>
        </Nav>


        <Nav>
          <h3> Sort by </h3>
          <Nav.Item>
            <p><button className="button"  onClick={() => onSelectSort("default")}>Category/default</button>
              <br></br></p>
          </Nav.Item>

          <Nav.Item>
            <p><button className="button"  onClick={() => onSelectSort("price")}>Price(low to high)</button>
              <br></br></p>
          </Nav.Item>

          <Nav.Item>
            <p><button className="button"  onClick={() => onSelectSort("priceHigh")}>Price(high to low)</button>
              <br></br></p>
          </Nav.Item>

          <Nav.Item>
            <p><button className="button"  onClick={() => onSelectSort("calories")}>Calories</button>
              <br></br></p>
          </Nav.Item>

          <Nav.Item>
            <p><button className="button" onClick={() => onSelectSort("pop")}>Popularity</button>
              <br></br></p>
          </Nav.Item>
        </Nav>

      </div>

      <div className="cart">
          <Aggregator cartList={cart} totalPrice={totalPrice} clearCart={clearCart}/>
        </div>

      <div className="right">
        <DisplayList list={props.list.filter(matchesFilterType).filter(matchesFilterRes).sort(matchesSortPrice)
        } addToCart={addToCart} removeCart={removeCart} />
      </div>
    </div>

  );



}
