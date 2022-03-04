import React from 'react';
import axios from 'axios';

type Cat = {
	url: string;
};

const fetchCat = () =>
	axios.get<Array<Cat>>(`https://api.thecatapi.com/v1/images/search`);

function App() {
	const [cats, setCats] = React.useState<Array<Cat> | undefined>(undefined);
	const [loading, setLoading] = React.useState(true);

	React.useEffect(() => {
		newCat();
	}, []);

	const newCat = () => {
		setLoading(true);
		fetchCat().then((res) => {
			setCats(res.data);
			setLoading(false);
		});
	};

	if (loading) {
		return (
			<div
				style={{
					height: '100vh',
					width: '100%',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					flexDirection: 'column',
				}}
			>
				<span>Fetching cat</span>
				{/* <LinearProgress style={{ width: '95%' }} /> */}
			</div>
		);
	}

	if (cats && cats.length > 0) {
		return (
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					height: '80vh',
					justifyContent: 'space-between',
				}}
			>
				<h1>Cat</h1>
				<img
					src={cats[0].url}
					alt='cat'
					style={{ maxHeight: '60vh', maxWidth: '100vw' }}
				/>
				<button onClick={newCat}>New cat</button>
			</div>
		);
	}

	return <div>Something terrible has happened</div>;
}

export default App;
