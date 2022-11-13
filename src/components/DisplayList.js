import React from 'react';
import './DisplayList.css';
import Card from 'react-bootstrap/Card';



// TODO: create a component that displays a single bakery item

export default function DisplayList(props) {

  const filteredList = props.list

  return (
    <div className="Menu">
      {filteredList.map((item, index) => ( // TODO: map bakeryData to BakeryItem components
        <Card style={{ width: '20rem' }} className="card">
          <Card.Img variant="top" src={item.image} className="img" />
          <Card.Body>
            <Card.Title><h4>{item.name}</h4></Card.Title>
            <Card.Title>${item.price}</Card.Title>
            <p> Calories: {item.calories} <br></br> Type: {item.type}
              <br></br>Temperature options: {item.restrictions}
            </p>
            <Card.Text>
              <p> {item.description} </p>
            </Card.Text>
            <p>  <button className="button-24"  onClick={() => props.addToCart(item)}>ADD TO CART</button> </p>
            <p>  <button className="button-25"  onClick={() => props.removeCart(item)}>REMOVE</button> </p>
          </Card.Body>
        </Card>
      ))}
    </div>
  );

}
