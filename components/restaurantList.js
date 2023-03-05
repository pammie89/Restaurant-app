import { gql, useQuery } from '@apollo/client';
import Dishes from "./dishes"
import { useContext, useState } from 'react';


import AppContext from "./context"
import {
  Button,
  Card,
  CardBody,
  CardImg,
  CardText,
  CardTitle,
  Container,
  Row,
  Col
} from "reactstrap";

function RestaurantList(props) {
  const [restaurantID, setRestaurantID] = useState(0)
  const { cart } = useContext(AppContext);
  const [state, setState] = useState(cart)
  const GET_RESTAURANTS = gql`
    query {
      restaurants {
        id
        name
        
        description
        image {
          url
        }
        
      }
    }
  `;
  const { loading, error, data } = useQuery(GET_RESTAURANTS)
  if (loading) return <p>Loading...</p>;
  if (error) return <p>ERROR</p>;
  if (!data) return <p>Not found</p>;
  console.log(`Query Data: ${data.restaurants}`)


  let searchQuery = data.restaurants.filter((res) => {
    return res.name.toLowerCase().includes(props.search)
  }) || [];

  let restId = searchQuery[0] ? searchQuery[0].id : null;

  // definet renderer for Dishes
  const renderDishes = (restaurantID) => {
    return (<Dishes restId={restaurantID}> </Dishes>)
  };
  if (searchQuery.length > 0) {
    const restList = searchQuery.map((res) => (
      <Col xs="6" sm="4" key={res.id}>
        <Card style={{ margin: "0 0.5rem 20px 0.5rem" }}>
          <CardImg
            top={true}
            style={{ height: 200 }}
            src={
              `https://strapi-api-gwlj.onrender.com/admin` + res.image.url
            }
          />
          <CardBody style={{backgroundColor: '#f0f5f6'}}>
            <CardText >{res.description}  {res.price}</CardText>
          </CardBody>
          <div className="card-footer" style={{backgroundColor: '#bac3cc'}}>

            <Button style={{backgroundColor: '#506580', textTransform: 'uppercase'}} onClick={() => setRestaurantID(res.id)}>{res.name}</Button>
           
          </div>
        </Card>
      </Col>
    ))

    return (

      <Container>
        <Row xs='3'>
          {restList}
        </Row>

        <span style={{width: '100%', borderBottom: '3px dashed #ffffff'}}><img src="../images/line.png" style={{width: '100%', paddingBottom: '1rem'}}></img></span>

        <Row xs='3'>
          {renderDishes(restaurantID)}
        </Row>

      </Container>

    )
  } else {
    return <h1> No Restaurants Found</h1>
  }
}
export default RestaurantList