This demonstrates the usage of the WfsSearch.

```jsx
const React = require('react');
const OlMap = require('ol/map').default;
const OlView = require('ol/view').default;
const OlLayerTile = require('ol/layer/tile').default;
const OlSourceOsm = require('ol/source/osm').default;
const OlProj = require('ol/proj').default;

class WfsSearchExample extends React.Component {

  constructor(props) {

    super(props);

    this.mapDivId = `map-${Math.random()}`;

    this.map = new OlMap({
      layers: [
        new OlLayerTile({
          name: 'OSM',
          source: new OlSourceOsm()
        })
      ],
      view: new OlView({
        center: OlProj.fromLonLat([37.40570, 8.81566]),
        zoom: 4
      })
    });
  }

  componentDidMount() {
    this.map.setTarget(this.mapDivId);
  }

  render() {
    return(
      <div>
        <div className="example-block">
          <label>WFS Search:<br />
            <WfsSearch
              placeholder="Type a countryname in its own language…"
              baseUrl='https://ows.terrestris.de/geoserver/osm/wfs'
              featureTypes={['osm:osm-country-borders']}
              searchAttributes={{
                'osm:osm-country-borders': ['name']
              }}
              map={this.map}
              style={{
                width: '80%'
              }}
            />
          </label>
        </div>
        <div
          id={this.mapDivId}
          style={{
            height: '400px'
          }}
        />
      </div>
    )
  }
}

<WfsSearchExample />
```
