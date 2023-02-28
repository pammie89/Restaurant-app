import {useRouter} from "next/router"
import {gql,useQuery} from '@apollo/client';
import {useState, useContext} from 'react'
import AppContext from "./context"
import {
  Button,
  Card,
  CardBody,
  CardImg,
  CardText,
  CardTitle,
  Row,
  Col} from "reactstrap";
function Dishes({restId}){
  const [restaurantID, setRestaurantID] = useState()
  const {addItem} = useContext(AppContext)

const GET_RESTAURANT_DISHES = gql`
  query($id: ID!) {
    restaurant(id: $id) {
      id
      name
      dishes {
        id
        name
        description
        price
        image {
          url
        }
      }
    }
  }
`;

  const router = useRouter();

  const { loading, error, data } = useQuery(GET_RESTAURANT_DISHES, {
    variables: { id: restId},
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>ERROR here</p>;
  if (!data) return <p>Not found</p>;

  let restaurant = data.restaurant;

  if (restId > 0){

    return (
      <>
          {restaurant.dishes.map((res) => (
            <Col xs="6" sm="4" style={{ padding: 0 }} key={res.id}>
              <Card style={{ margin: "20px 10px" }}>
                <CardImg 
                  top={true}
                  // style={{ height: 150, width:150 }}
                  src={`http://localhost:1337${res.image.url}`}
                />
                <CardBody>
                  <CardTitle style={{ fontSize: '1.3rem', textTransform: 'uppercase', fontFamily: "Segoe UI Symbol" }}>{res.name}</CardTitle>
                  <CardText style={{ fontSize: '1.0rem', fontFamily: "Segoe UI Symbol" }}>{res.description}
                 
                  </CardText>
                 <span style={{fontWeight: '600', color: '#bc2330'}}>{restaurant.name}</span>
                </CardBody>
                <div className="card-footer" style={{ backgroundColor: '#506580', display: 'flex', flexDirection: 'column'}}>
                  <Button color="danger"
                    outlinecolor="primary"
                    onClick = {()=> addItem(res)}
                  >
                    + Add To Cart
                  </Button>
                  <span style={{color: 'white', fontSize: '1.5rem', justifyContent: 'right', paddingTop: '5px'}}>${res.price}</span>
                </div>
              </Card>
            </Col>
          ))}
        </>
        )}
        else{
          return <div style={{textAlign: 'center', margin: 'auto', paddingBottom: '1.3rem'}}> <h1 style={{paddingTop: '1.3rem', color: "#eeeeee", fontWeight: '200', fontSize: '1.5rem', paddingBottom: '1.3rem', backgroundColor: '#bc2330', paddingRight: '1rem', paddingLeft: '1rem'}}>Select a restaurant to view its menu</h1>
                </div>
        }
    }
    export default Dishes