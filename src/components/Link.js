import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { AUTH_TOKEN } from '../constants';
import { timeDifferenceForDate } from '../utils';

const VOTE_MUTATION = gql`
  mutation VoteMutation($linkId: ID!) {
    vote(linkId: $linkId) {
      id
      link {
        id votes {
          id
          user {
            id
          }
        }
      }
      user {
        id
      }
    }
  }
`

class Link extends Component {
  render() {
    const authToken = localStorage.getItem(AUTH_TOKEN);

    return (
      <div className="flex mt2 items-start">
        <div className="flex items-center">
          <span className="gray">{this.props.index + 1}</span>
          {authToken && (
            <Mutation mutation={VOTE_MUTATION} variables={{ linkId: this.props.link.id}}>
              {mutation => (
                <div className="mh2 gray f11 pointer" onClick={mutation}>
                <span role="img" aria-labelledby="upvote">👆</span>
              </div>
              )}
            </Mutation>
            
          )}
          <div>
            {this.props.link.description} ({this.props.link.url})
          </div>
          <div className="f6 lh-copy gray">
          {this.props.link.votes.length} votes | by{' '}
          {this.props.link.postedBy
            ? this.props.link.postedBy.name
            : 'Unknown'}{' '}
          {timeDifferenceForDate(this.props.link.createdAt)}
          </div>
        </div>
      </div>
    )
  }
}

export default Link;