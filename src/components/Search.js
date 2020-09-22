import React, { Component } from 'react';
import { withApollo } from 'react-apollo';
import gql from 'graphql-tag';
import Link from './Link';

const FEED_SEARCH_QUERY =  gql`
  query FeedSearchQuery($filter: String!) {
  feed(filter: $filter) {
    links {
      id
      url
      description
      createdAt
      postedBy {
        id
        name
      }
      votes {
        id
        user {
          id
        }
      }
    }
  }
}
`

class Search extends Component {
  state = { 
    links: [],
    filter: ''
  }

  render() {
    return(
      <div>
        <div>
          Search
          <input type="text" onChange={ e => this.setState({ filter: e.target.value })} />
          <button onClick={() => this._executeSerch()}>OK</button>
        </div>
        {this.state.links.map((link, index) => (
          <Link key={link.id} link={link} index={index} />
        ))}
      </div>
    )
  }
  _executeSerch = async () => {
    const { filter } = this.state;
    console.log(filter);
    const result = await this.props.client.query({
      query: FEED_SEARCH_QUERY,
      variables: { filter }
    })
    const links = result.data.feed.links;
    this.setState({ links })
  }
}

// puporse the withApollo is to load data evertime the user hit search - not  the initial load of the component 
export default withApollo(Search)