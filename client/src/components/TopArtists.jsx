import styled, { keyframes } from 'styled-components';
import { getTopArtistsShort, getTopArtistsMedium, getTopArtistsLong } from '../spotify';

const TIME_RANGES = [
  { label: 'All Time', value: 'long_term', fn: getTopArtistsLong },
  { label: 'Last 6 Months', value: 'medium_term', fn: getTopArtistsMedium },
  { label: 'Last Month', value: 'short_term', fn: getTopArtistsShort },
];

const TopArtist = () => {
    const [artists, setArtists] = useState(null);
    const [activeRange, setActiveRange] = useState('long_term');
    const [loading, setLoading] = useState(true);

    const fetchArtists = (range) => {
    setLoading(true);
    const found = TIME_RANGES.find(r => r.value === range);
    found.fn().then(({ data }) => {
      setArtists(data);
      setLoading(false);
    });
  };
  
    useEffect(() => {
        fetchArtists('long_term');
    }, []);

    const handleRangeChange = (range) => {
        setActiveRange(range);
        fetchArtists(range);
    };

    return ( 
        <h1>Top Artists</h1>
    )
}

export default TopArtist;
  