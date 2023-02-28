import React, { useState } from "react";
import Cart from "../components/cart"
import {ApolloProvider,ApolloClient,HttpLink, InMemoryCache} from '@apollo/client';
import RestaurantList from '../components/restaurantList';
import { InputGroup, InputGroupAddon,Input} from "reactstrap";



function Home() {
    const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337";
    console.log(`URL: ${API_URL}`)
    const [query, setQuery] = useState("");
    const link = new HttpLink({ uri: `${API_URL}/graphql`})
    const cache = new InMemoryCache()
    const client = new ApolloClient({link,cache});

  
    return (
        
            
        <ApolloProvider client={client}>
          <div style={{width: '70%', margin: 'auto'}} className="search">
              <h2 style={{fontFamily: "'Roboto', sans-serif", paddingTop: '2rem', color: "#eeeeee", fontWeight: '200', fontSize: '1.3rem'}}> </h2>
                <InputGroup style={{borderRadius: '5px', border: 'none', }} >
                <InputGroupAddon  addonType="append" > Search </InputGroupAddon>
                <Input
                    onChange={(e) =>
                    setQuery(e.target.value.toLocaleLowerCase())
                    }
                    value={query}
                    placeholder= "Find Local Restaurants"
                />
                </InputGroup><br></br>
            </div>
            <RestaurantList  search={query} />
            
        </ApolloProvider>
        
       
    );
  }

  
  
  export default Home;
  