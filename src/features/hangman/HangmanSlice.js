import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';

const url = process.env.REACT_APP_API_URL;


const headers = {
  "Content-Type" : "application/json",
  "Access-Control-Request-Headers": "Content-Type"
};

export const createUser = createAsyncThunk(
  'users/createUser',
  async (userData) => {
    try {
      return await axios.post(url + 'user_create/', userData);
    } catch (error) {
      console.log(error);
    }
  }
);

export const checkUser = createAsyncThunk(
  'users/checkUser',
  async (name) => {
    try {
      const response = await axios.get(url + `users/${name}`);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const addScore = createAsyncThunk(
  'scores/addScore',
  async (scoreData) => {
    try {
      return await axios.post(url + 'add-score/', scoreData);
    } catch (error) {
      console.log(error);
    }
  }
);

export const getTopScores = createAsyncThunk(
  'scores/getTopScores',
  async () => {
    try {
      const response = await axios.get(url + 'top-score/');
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getScoreByGameId = createAsyncThunk(
  'scores/getScoreByGameId',
  async (gameId) => {
    try {
      const response = await axios.get(url + 'top-score-game/', {
        params: { game_id: gameId },
      });
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const createComputer = createAsyncThunk(
  'computers/createComputer',
  async (computerData) => {
    try {
      return await axios.post(url + 'computer_create/', computerData);
    } catch (error) {
      console.log(error);
    }
  }
);

export const getComputers = createAsyncThunk(
  'computers/getComputers',
  async () => {
    try {
      const response = await axios.get(url + 'computer/');
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const updateComputer = createAsyncThunk(
  'computers/updateComputer',
  async (computerData) => {
    try {
      return await axios.put(url + `computer_update/${computerData.id}/`, computerData, { headers });
    } catch (error) {
      console.log(error);
    }
  }
);

export const deleteComputer = createAsyncThunk(
  'computers/deleteComputer',
  async (computerId) => {
    try {
      return await axios.delete(url + `computer_delete/${computerId}/`);
    } catch (error) {
      console.log(error);
    }
  }
);

export const viewPlayer = createAsyncThunk('players/fetchPlayers', async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(url+`player/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
});

export const createPlayer = createAsyncThunk(
    'players/create_player',
    async (data) => {
        try{
            return await axios.post(url + 'player_create/',data);
        } catch (error) {
            console.log(error)
        }
    }
)

export const updatePlayer = createAsyncThunk(
    'players/update_player',
    async (data) => {
        console.log("UUID: ",data['uuid'])
        try{
            return await axios.put(url + 'player_update/'+data['uuid'] + '/' ,data['player'], { headers });
        } catch (error) {
            console.log(error)
        }
    }
)

export const deletePlayer = createAsyncThunk(
    'players/update_player',
    async (uuid) => {
        try{
            return await axios.delete(url + 'player_delete/' + uuid + '/');
        } catch(error) {
            console.log(error)
        }
    }
)

export const randomComputer = createAsyncThunk(
    'players/random_computer',
    async () => {
        try {
            const response =  await axios.get(url + 'random_computer/')
            return response.data
        } catch (error) {
            console.log(error)
        }
    
    }
)

export const hangmanSlice = createSlice({
    name: 'hangman',
    initialState: {
      players: [],
      status: 'idle',
      error: null,
      isLoading: false, // add new state variable
    },
    reducers: {
      // ...
    },
    extraReducers: {
        [viewPlayer.pending]: (state) => {
          state.status = 'loading';
          state.isLoading = true; // set loading state to true
        },
        [viewPlayer.fulfilled]: (state, action) => {
          state.status = 'succeeded';
          state.players = action.payload;
          state.isLoading = false; // set loading state to false
        },
        [viewPlayer.rejected]: (state, action) => {
          state.status = 'failed';
          state.error = action.payload;
          state.isLoading = false; // set loading state to false
        },
        [createPlayer.pending]: (state) => {
          state.status = 'loading';
        },
        [createPlayer.fulfilled]: (state, action) => {
          state.status = 'succeeded';
          state.players.push(action.payload);
        },
        [createPlayer.rejected]: (state, action) => {
          state.status = 'failed';
          state.error = action.payload;
        },
        [updatePlayer.pending]: (state) => {
          state.status = 'loading';
        },
        [updatePlayer.fulfilled]: (state, action) => {
          state.status = 'succeeded';
          state.players = state.players.map(player => player.uuid === action.payload.uuid ? action.payload : player)
        },
        [updatePlayer.rejected]: (state, action) => {
          state.status = 'failed';
          state.error = action.payload;
        },
        [deletePlayer.pending]: (state) => {
          state.status = 'loading';
        },
        [createUser.pending]: (state) => {
          state.status = 'loading';
          state.isLoading = true;
        },
        [createUser.fulfilled]: (state, action) => {
          state.status = 'succeeded';
          state.users.push(action.payload);
          state.isLoading = false;
        },
        [createUser.rejected]: (state, action) => {
          state.status = 'failed';
          state.error = action.error.message;
          state.isLoading = false;
        },
        [fetchUser.pending]: (state) => {
          state.status = 'loading';
          state.isLoading = true;
        },
        [fetchUser.fulfilled]: (state, action) => {
          state.status = 'succeeded';
          state.user = action.payload;
          state.isLoading = false;
        },
        [fetchUser.rejected]: (state, action) => {
          state.status = 'failed';
          state.error = action.error.message;
          state.isLoading = false;
        },
        [addScore.pending]: (state) => {
          state.status = 'loading';
          state.isLoading = true;
        },
        [addScore.fulfilled]: (state, action) => {
          state.status = 'succeeded';
          state.scores.push(action.payload);
          state.isLoading = false;
        },
        [addScore.rejected]: (state, action) => {
          state.status = 'failed';
          state.error = action.error.message;
          state.isLoading = false;
        },
        [fetchTopScores.pending]: (state) => {
          state.status = 'loading';
          state.isLoading = true;
        },
        [fetchTopScores.fulfilled]: (state, action) => {
          state.status = 'succeeded';
          state.topScores = action.payload;
          state.isLoading = false;
        },
        [fetchTopScores.rejected]: (state, action) => {
          state.status = 'failed';
          state.error = action.error.message;
          state.isLoading = false;
        },
        [fetchScoreByGameId.pending]: (state) => {
          state.status = 'loading';
          state.isLoading = true;
        },
        [fetchScoreByGameId.fulfilled]: (state, action) => {
          state.status = 'succeeded';
          state.scoresByGameId = action.payload;
          state.isLoading = false;
        },
        [fetchScoreByGameId.rejected]: (state, action) => {
          state.status = 'failed';
          state.error = action.error.message;
          state.isLoading = false;
        },
        [fetchComputers.pending]: (state) => {
          state.status = 'loading';
          state.isLoading = true;
        },
        [fetchComputers.fulfilled]: (state, action) => {
          state.status = 'succeeded';
          state.computers = action.payload;
          state.isLoading = false;
        },
        [fetchComputers.rejected]: (state, action) => {
          state.status = 'failed';
          state.error = action.error.message;
          state.isLoading = false;
        },
        [createComputer.pending]: (state) => {
          state.status = 'loading';
          state.isLoading = true;
        },
        [createComputer.fulfilled]: (state, action) => {
          state.status = 'succeeded';
          state.computers.push(action.payload);
          state.isLoading = false;
        },
        [createComputer.rejected]: (state, action) => {
          state.status = 'failed';
          state.error = action.error.message;
          state.isLoading = false;
        },
        [fetchComputer.pending]: (state) => {
          state.status = 'loading';
          state.isLoading = true;
        },
    }})

export const { addHangman, toggleHangman, deleteHangman } = hangmanSlice.actions;

export default hangmanSlice.reducer;