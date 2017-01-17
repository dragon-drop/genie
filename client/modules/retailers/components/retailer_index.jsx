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
            <h2>{retailer._id} - <span className="retailer__name">{retailer.name}</span></h2>
          </li>
        ))}
        </ul>

        <a href="/retailers/new">Add retailer</a>
      </div>
    );
  }
}

export default RetailerIndex;
