import React, { useState } from 'react';
import { Input, Button, Select, MenuItem, InputLabel, FormControl, Alert } from '@mui/material';
import './styles/UploadForm.css'; // Ensure this CSS file exists or remove it if not needed
import questionService from '../services/questionService';

const UploadForm = () => {
    const [file, setFile] = useState(null);
    const [subject, setSubject] = useState('');
    const [successMessage, setSuccessMessage] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [partialErrors, setPartialErrors] = useState(null); // To handle duplicate questions

    // Handlfile selection
    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];

        if (selectedFile && selectedFile.type === 'text/csv') {
            setFile(selectedFile);
            setSuccessMessage(null);
            setPartialErrors(null);
            setErrorMessage(null);
        } else {
            setFile(null);
            setErrorMessage('Please upload a valid CSV file.');
        }
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!file) {
            setErrorMessage('No file selected. Please select a CSV file to upload.');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);
        formData.append('subject', subject);

        try {
            const result = await questionService.uploadQuestions(formData);

            // Clear old messages
            setSuccessMessage(null);
            setErrorMessage(null);
            setPartialErrors(null);

            if (result.existedQuestions && result.existedQuestions.length > 0) {
                
                setSuccessMessage(`Partial Success: ${result.message}`);
                setPartialErrors(`Duplicate questions: ${result.existedQuestions.join(', \n')}`);
            } 
            else if (result.status.includes('uploaded')) {
                setSuccessMessage(`Success: ${result.message}`);
            } 
            else if(result.status.includes('Failed')){
                setErrorMessage(`Failed to Upload ${result.error}`)
                setErrorMessage('Unexpected response from the server.');
            }
        } catch (error) {
            setSuccessMessage(null);
            setPartialErrors(null);
            setErrorMessage(`Failed to upload. ${error.message}`); // Display the exact error message from backend
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1 >Admin's Upload Portal</h1>
            <h2>Upload Questions from CSV File</h2>

            {/* Select Subject Dropdown */}
            <FormControl fullWidth style={{ marginBottom: '16px' }}>
                <InputLabel id="subject-select-label">Select Subject</InputLabel>
                <Select
                    labelId="subject-select-label"
                    value={subject}
                    label="Select Subject"
                    onChange={(e) => setSubject(e.target.value)}
                    required
                >
                    <MenuItem value="Java">Java</MenuItem>
                    <MenuItem value="Python">Python</MenuItem>
                    <MenuItem value="ISTQB">ISTQB</MenuItem>
                </Select>
            </FormControl>

            {/* File Input Field */}
            <Input
                data-testid="file-input"
                type="file"
                inputProps={{ accept: '.csv' }}
                onChange={handleFileChange}
                fullWidth 
                style={{ marginBottom: '20px' }}
                required
            />

            {/* Submit Button */}
            <Button type="submit" variant="contained" color="primary" fullWidth>
                Upload
            </Button>

            {/* Display success message */}
            {successMessage && (
                <Alert severity="success" style={{ marginTop: '16px', color: 'green' }}>
                    {successMessage}
                </Alert>
            )}

            {/* Display error message */}
            {errorMessage && (
                <Alert severity="error" style={{ marginTop: '16px', color: 'red' }}>
                    {errorMessage}
                </Alert>
            )}

             {/* Partial Errors (e.g., duplicate questions) */}
             {partialErrors && (
                <Alert severity="warning" style={{ marginTop: '16px', color: 'orange' }}>
                    {partialErrors}
                </Alert>
            )}
        </form>
    );
};

export default UploadForm;
