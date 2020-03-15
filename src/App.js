import React from 'react';

// Import from Material UI dependency
import { Grid } from '@material-ui/core';

// Import from API folder 
import youtube from './api/youtube';

// Import from Components folder
import { SearchBar, VideoDetail, VideoList } from './components';

class App extends React.Component {
    state = {
        videos: [],
        selectedVideo: null,
    }

    componentDidMount() {
        this.handleSubmit('Revision Demo Party');
    }

    onVideoSelect = (video) => {
        this.setState({ selectedVIdeo: video });
    }

    handleSubmit = async (searchTerm) => {
        const response = await youtube.get('search', {
            params: { 
                part: 'id, snippet',
                maxResults: 5,
                key: 'AIzaSyB5bwOG7J4bkwcfvKwhxofCkvz26z7DGt8',            
                q: searchTerm 
            }
        })
        
        this.setState({ 
            videos: response.data.items, 
            selectedVideo: response.data.items[0] 
        })
    }

    render() {
        const { selectedVideo, videos } = this.state;
        return (
           <Grid justify="center" container spacing={10}>
               <Grid item xs={12}>
                    <Grid container spacing={10}>
                        <Grid item xs={12}>
                            <SearchBar onFormSubmit={this.handleSubmit} />
                        </Grid>
                        <Grid item xs={4}>
                            <VideoList videos={videos} onVideoSelect={this.onVideoSelect} />
                        </Grid>
                        <Grid item xs={8}>
                            <VideoDetail video={selectedVideo}/>
                        </Grid>
                    </Grid>
               </Grid>
           </Grid>
        )
    }
}

export default App;