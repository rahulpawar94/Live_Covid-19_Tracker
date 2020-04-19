import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import CardDeck from 'react-bootstrap/CardDeck';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import Columns from 'react-columns';
import Form from 'react-bootstrap/Form';
import './App.css';
import logo from './COVID-19-LIVE_UPDATES.png';
import { Fab } from '@material-ui/core';
import { GitHub as GitHub } from '@material-ui/icons';

function App() {
  const [latest, setLatest] = useState([]);
  const [results, setResults] = useState([]);
  const [searchCountry, setsearchCountry] = useState("");

  // useEffect(() => {
  //   axios
  //     .get("https://corona.lmao.ninja/v2/all")
  //     .then(res => {
  //       setLatest(res.data);
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // }, []);

  useEffect(() => {
    axios
      .all([
        axios.get("https://corona.lmao.ninja/v2/all"),
        axios.get("https://corona.lmao.ninja/v2/countries")
      ])
      .then(responseArr => {
        setLatest(responseArr[0].data);
        setResults(responseArr[1].data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);


  const date = new Date(parseInt(latest.updated));
  const lastUpdated = date.toString();

  const filterCountry = results.filter(item => {
    return searchCountry !== "" ? item.country.includes(searchCountry) : item;
  });



  // const countries = results.map((data, i) => {
  const countries = filterCountry.map((data, i) => {
    return (

      <Card
        key={i}
        bg="light"
        text={"dark"}
        className="text-center"
        style={{ margin: "10px" }}
      >
        <Card.Img variant="top" src={data.countryInfo.flag} />
        <Card.Body>
          <Card.Title>{data.country}</Card.Title>
          <Card.Text>Cases {data.cases}</Card.Text>
          <Card.Text>Deaths {data.deaths}</Card.Text>
          <Card.Text>Recoverd {data.recovered}</Card.Text>
          <Card.Text>Today's cases {data.todayCases}</Card.Text>
          <Card.Text>Today's deaths {data.todayDeaths}</Card.Text>
          <Card.Text>Active {data.active}</Card.Text>
          <Card.Text>Critical {data.critical}</Card.Text>
        </Card.Body>
      </Card>
    );
  });

  var queries = [{
    columns: 2,
    query: 'min-width: 500px'
  }, {
    columns: 3,
    query: 'min-width: 1000px'
  }];


  return (
    <div className="wrapper">

      <img src={logo} alt="corona" className="liveupdateimg" />

      <h1>COVID-19 coverage</h1>
      <h1>LIVE UPDATES</h1>
      <Fab
        variant="extended"
        size="small"
        color='inherit'
        aria-label="add"
        className="fabIcon"
        href='https://github.com/rahulpawar94'
      >
        <GitHub /> 
           Developer@Rahul Pawar
        </Fab>

      <CardDeck>
        <Card bg="primary"
          text={"white"}
          className="text-center"
          style={{ margin: "10px" }}
        >
          <Card.Body>
            <Card.Title>Cases</Card.Title>
            <Card.Text>
              {latest.cases}
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <small>Last updated {lastUpdated} </small>
          </Card.Footer>
        </Card>
        <Card
          bg="danger"
          text={"white"}
          className="text-center"
          style={{ margin: "10px" }}
        >
          <Card.Body>
            <Card.Title>Deaths</Card.Title>
            <Card.Text>
              {latest.deaths}
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <small>Last updated {lastUpdated} </small>
          </Card.Footer>
        </Card>
        <Card
          bg="success"
          text={"white"}
          className="text-center"
          style={{ margin: "10px" }}
        >
          <Card.Body>
            <Card.Title>Recoverd</Card.Title>
            <Card.Text>
              {latest.recovered}
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <small>Last updated {lastUpdated} </small>
          </Card.Footer>
        </Card>
        <Card
          bg="warning"
          text={"white"}
          className="text-center"
          style={{ margin: "10px" }}
        >
          <Card.Body>
            <Card.Title>Today's Cases</Card.Title>
            <Card.Text>
              {latest.todayCases}
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <small>Last updated {lastUpdated} </small>
          </Card.Footer>
        </Card>
        <Card
          bg="secondary"
          text={"white"}
          className="text-center"
          style={{ margin: "10px" }}
        >
          <Card.Body>
            <Card.Title>Today's Deaths</Card.Title>
            <Card.Text>
              {latest.todayDeaths}
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <small>Last updated {lastUpdated} </small>
          </Card.Footer>
        </Card>
      </CardDeck>

      <Form>
        <Form.Group controlId="formgroupSearch">
          <Form.Control
            type="text"
            placeholder="Search a country"
            onChange={e => setsearchCountry(e.target.value)}
          />
        </Form.Group>
      </Form>

      <Columns queries={queries}>{countries}</Columns>
    </div>
  );
}

export default App;
