import React from 'react';

class RetailerIndex extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { retailers } = this.props;

    return (
      <div id="retailers">
        <h1>Retailers</h1>

        <ul>
        {retailers.map((retailer) => (
          <li key={retailer._id} className="retailer">
            <a href={`/${retailer._id}`}>
              <h2>{retailer._id} - <span className="retailer__name">{retailer.name}</span></h2>
            </a>
          </li>
        ))}
        </ul>

        <a href="/app/retailers/new">Add retailer</a>
      </div>
    );
  }
}

export default RetailerIndex;
