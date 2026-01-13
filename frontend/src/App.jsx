import { useState } from 'react';
import { 
  Container, Typography, TextField, Box, Button, 
  CircularProgress, FormControl, InputLabel, Select, MenuItem, Paper 
} from '@mui/material';
import axios from 'axios';
import './App.css';

function App() {
  const [emailContent, setEmailContent] = useState('');
  const [tone, setTone] = useState('');
  const [generatedReply, setGeneratedReply] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    try {
      // Ensure this URL matches your Spring Boot @RequestMapping
      const response = await axios.post("http://localhost:8080/api/email/generate", {
        emailContent,
        tone
      });
      setGeneratedReply(response.data);
    } catch (err) {
      setError("Failed to generate email reply. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom align="center">
        Email Reply Generator
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        {/* Input Field */}
        <TextField
          fullWidth
          multiline
          rows={6}
          variant="outlined"
          label="Original Email Content"
          placeholder="Paste the email you received here..."
          value={emailContent}
          onChange={(e) => setEmailContent(e.target.value)}
        />

        {/* Tone Selection */}
        <FormControl fullWidth>
          <InputLabel id="tone-label">Tone (Optional)</InputLabel>
          <Select
            labelId="tone-label"
            value={tone}
            label="Tone (Optional)"
            onChange={(e) => setTone(e.target.value)}
          >
            <MenuItem value="">None</MenuItem>
            <MenuItem value="professional">Professional</MenuItem>
            <MenuItem value="casual">Casual</MenuItem>
            <MenuItem value="friendly">Friendly</MenuItem>
            <MenuItem value="humorous">Humorous</MenuItem>
          </Select>
        </FormControl>

        {/* Action Button */}
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          disabled={!emailContent || loading}
          size="large"
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : "Generate Reply"}
        </Button>

        {/* Error Message */}
        {error && (
          <Typography color="error" variant="body2">
            {error}
          </Typography>
        )}

        {/* Output Section */}
        {generatedReply && (
          <Box sx={{ mt: 4 }}>
            <Typography variant="h6" gutterBottom>
              Generated Reply:
            </Typography>
            <Paper elevation={3} sx={{ p: 2, bgcolor: '#f5f5f5' }}>
              <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
                {generatedReply}
              </Typography>
              <Button
                variant="outlined"
                sx={{ mt: 2 }}
                onClick={() => navigator.clipboard.writeText(generatedReply)}
              >
                Copy to Clipboard
              </Button>
            </Paper>
          </Box>
        )}
      </Box>
    </Container>
  );
}

export default App;