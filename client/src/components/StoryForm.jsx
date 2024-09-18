import { useState } from 'react';
import axios from 'axios';

const StoryForm = () => {
  const [prompt, setPrompt] = useState('');
  const [story, setStory] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/content`, { question: prompt });
      setStory(response.data.result);
      setLoading(false);
    } catch (err) {
      console.error('Error generating content', err);
      setError('Failed to generate content. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.wrapper}>
        <div style={styles.card}>
          <h1 style={styles.heading}>✨ Generate AI-Powered Content ✨</h1>
          <form onSubmit={handleSubmit} style={styles.form}>
            <textarea
              style={styles.textarea}
              placeholder="Enter your question or prompt"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              required
            />
            <button
              type="submit"
              disabled={loading}
              style={loading ? { ...styles.button, ...styles.disabledButton } : styles.button}
            >
              {loading ? 'Generating...' : 'Generate Content'}
            </button>
          </form>

          {error && <p style={styles.error}>{error}</p>}
        </div>

        {story && (
          <div style={styles.storyContainer}>
            <h2 style={styles.storyTitle}>📖 Generated Story:</h2>
            <p style={styles.story}>{story}</p>
          </div>
        )}
      </div>
    </div>
  );
};

// Internal CSS styles with full-screen background color
const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f4f8',
    height: '100vh',
    width: '100vw',
    margin: '0',
    padding: '0',
  },
  wrapper: {
    display: 'flex',
    gap: '2rem', // Add spacing between the form and the story
    width: '100%',
    maxWidth: '1200px',
  },
  card: {
    backgroundColor: '#ffffff',
    padding: '2.5rem',
    borderRadius: '12px',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
    width: '50%', // Left side will take 50% width
    textAlign: 'center',
    transition: 'transform 0.3s ease',
  },
  heading: {
    fontSize: '2rem',
    color: '#333',
    marginBottom: '1.5rem',
    fontFamily: `'Poppins', sans-serif`,
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '1.2rem',
  },
  textarea: {
    width: '100%',
    height: '150px',
    padding: '1rem',
    borderRadius: '8px',
    border: '1px solid #ccc',
    fontSize: '1rem',
    outline: 'none',
    resize: 'none',
    backgroundColor: '#f7f9fc',
    boxShadow: 'inset 0 3px 6px rgba(0, 0, 0, 0.05)',
    transition: 'border-color 0.2s ease-in-out',
  },
  button: {
    backgroundImage: 'linear-gradient(90deg, #667eea, #764ba2)',
    color: 'white',
    border: 'none',
    padding: '0.75rem 2rem',
    borderRadius: '8px',
    fontSize: '1rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'transform 0.3s ease, background-color 0.3s ease',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
  },
  disabledButton: {
    backgroundColor: '#aaa',
    cursor: 'not-allowed',
  },
  error: {
    color: '#ff5252',
    marginTop: '1rem',
    fontWeight: '500',
    fontSize: '1.1rem',
  },
  storyContainer: {
    backgroundColor: '#ffffff',
    padding: '2.5rem',
    borderRadius: '12px',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
    width: '50%', // Right side will take 50% width
  },
  storyTitle: {
    fontSize: '1.6rem',
    marginBottom: '1rem',
    color: '#333',
  },
  story: {
    fontSize: '1rem',
    lineHeight: '1.6',
    color: '#555',
  },
};

export default StoryForm;
