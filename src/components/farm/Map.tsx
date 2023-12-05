import {
    Box,
    Button,
    ButtonGroup,
    Grid,
    HStack,
    IconButton,
    Input,
    SkeletonText,
    Text,
  } from '@chakra-ui/react';
  import { FaLocationArrow, FaTimes } from 'react-icons/fa';
  import {
    useJsApiLoader,
    GoogleMap,
    Marker,
    Autocomplete,
    DirectionsRenderer,
  } from '@react-google-maps/api';
  import { useRef, useState } from 'react';
  
  interface LatLng {
    lat: number;
    lng: number;
  }
  
  const center: LatLng = { lat: 48.8584, lng: 2.2945 };
  
  function Map(): JSX.Element {
    const { isLoaded } = useJsApiLoader({
      googleMapsApiKey: 'AIzaSyCdpkVg4cZmmIzFPVyyTO7TCPZrVybZjUo',
      libraries: ['places'],
    });
  
    const [map, setMap] = useState<google.maps.Map | null>(null);
    const [directionsResponse, setDirectionsResponse] = useState<google.maps.DirectionsResult | null>(null);
    const [distance, setDistance] = useState<string>('');
    const [duration, setDuration] = useState<string>('');
  
    const originRef = useRef<HTMLInputElement>(null);
    const destinationRef = useRef<HTMLInputElement>(null);
  
    if (!isLoaded) {
      return <SkeletonText />;
    }
  
    async function calculateRoute() {
      if (!originRef.current || !destinationRef.current || originRef.current.value === '' || destinationRef.current.value === '') {
        return;
      }
  
      const directionsService = new google.maps.DirectionsService();
      const results = await directionsService.route({
        origin: originRef.current.value,
        destination: destinationRef.current.value,
        travelMode: google.maps.TravelMode.DRIVING,
      });
  
      setDirectionsResponse(results);
      setDistance(results.routes[0].legs[0].distance?.text || '');
      setDuration(results.routes[0].legs[0].duration?.text || '');
    }
  
    function clearRoute() {
      setDirectionsResponse(null);
      setDistance('');
      setDuration('');
      if (originRef.current) originRef.current.value = '';
      if (destinationRef.current) destinationRef.current.value = '';
    }
  
    return (
        <Grid templateColumns="1fr 1fr" h="100vh">
          {/* Left side: Form Box */}
          <Box p={4} borderRadius="lg" m={4} bgColor="white" shadow="base" minW="container.md">
            {/* Form Box */}
            <Box
              p={4}
              borderRadius='lg'
              m={4}
              bgColor='white'
              shadow='base'
              minW='container.md'
              zIndex='1'
            >
              <HStack spacing={2} justifyContent='space-between'>
                <Box flexGrow={1}>
                  <Autocomplete>
                    <Input type='text' placeholder='Origin' ref={originRef} />
                  </Autocomplete>
                </Box>
                <Box flexGrow={1}>
                  <Autocomplete>
                    <Input type='text' placeholder='Destination' ref={destinationRef} />
                  </Autocomplete>
                </Box>
      
                <ButtonGroup>
                  <Button colorScheme='pink' type='submit' onClick={calculateRoute}>
                    Calculate Route
                  </Button>
                  <IconButton
                    aria-label='center back'
                    icon={<FaTimes />}
                    onClick={clearRoute}
                  />
                </ButtonGroup>
              </HStack>
              <HStack spacing={4} mt={4} justifyContent='space-between'>
                <Text>Distance: {distance} </Text>
                <Text>Duration: {duration} </Text>
                <IconButton
                  aria-label='center back'
                  icon={<FaLocationArrow />}
                  isRound
                  onClick={() => {
                    if (map) {
                      map.panTo(center);
                      map.setZoom(15);
                    }
                  }}
                />
              </HStack>
            </Box>
          </Box>
    
          {/* Right side: Google Map Box */}
          <Box position="relative">
            <Box position='absolute' left={0} top={0} h='100%' w='100%'>
            <Box position='absolute' left={0} top={0} h='100%' w='100%'>
              {/* Google Map Box */}
              <GoogleMap
                center={center}
                zoom={15}
                mapContainerStyle={{ width: '100%', height: '100%' }}
                options={{
                  zoomControl: false,
                  streetViewControl: false,
                  mapTypeControl: false,
                  fullscreenControl: false,
                }}
                onLoad={(map) => setMap(map as google.maps.Map)}
              >
                <Marker position={center} />
                {directionsResponse && <DirectionsRenderer directions={directionsResponse} />}
              </GoogleMap>
            </Box>
            </Box>
          </Box>
        </Grid>
      )
    }
  
  export default Map;


 

  