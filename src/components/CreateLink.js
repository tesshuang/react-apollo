import React, { Componet } from 'react';

class CreateLink extends Componet {
  state ={
    description: '',
    url: ''
  }

  render() {
    const { description, url } = this.state;

    return(
      <div>
        <div>
          <input className="mb2" value={description} onChange={e => this.setState({description: e.target.value})} type="text" placeholder="A description for the link" />
          <input className="mb2" value={url} onChange={e => this.setState({url: e.target.value})} type="text" placeholder="A url for the link" />
        </div>
        <button onClick={`something`}>Submit</button>
      </div>
    )
  }
}

export default CreateLink;