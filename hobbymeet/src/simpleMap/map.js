import React from 'react';
import GoogleMapReact from 'google-map-react'; 
 
class SimpleMap extends React.Component {
 

    renderMarkers = (map, maps) => {
        let marker = new maps.Marker({
        position: {  lat: 59.95,
                    lng: 33.33 },
        map,
        title: 'Hello World!'
        });
        return marker;
    };
 
    render() {
        
        return (
        <div style={{ height: '45vh', flex:1 }}>
            <GoogleMapReact
            bootstrapURLKeys={{ key: "AIzaSyDgns2VbGf3dPxQP_Sv8Z4KxHaj565I_Kc" }}
            defaultCenter={{
                lat: 59.95,
                lng: 30.33
            }}
            defaultZoom={11}
            yesIWantToUseGoogleMapApiInternals
            onGoogleApiLoaded={({ map, maps }) => this.renderMarkers(map, maps)}
            >
            </GoogleMapReact>
        </div>
        );
    }
}
 
export default SimpleMap;