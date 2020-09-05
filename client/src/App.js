import React, { Component } from 'react';
import './App.css';

import axios from 'axios';
import { saveAs } from 'file-saver';

class App extends Component {
    state = {
        name: '',
        receiptID: 0,
        price1: 0,
        price2: 0,
    };

    handleChange = ({ target: { value, name } }) => this.setState({ [name]: value });

    createAndDownloadPDF = () => {
        axios
            .post('/create-pdf', this.state)
            .then(() => axios.get('/fetch-pdf', { responseType: 'blob' }))
            .then((res) => {
                const pdfBlob = new Blob([res.data], { type: 'application/pdf' });
                saveAs(pdfBlob, 'newPdf.pdf');
            });
    };
    render() {
        return (
            <div className="App">
                <input type="text" name="name" placeholder="Name" onChange={this.handleChange} />
                <input
                    type="number"
                    name="receiptID"
                    placeholder="Receipt ID"
                    onChange={this.handleChange}
                />
                <input
                    type="number"
                    name="price1"
                    placeholder="price 1"
                    onChange={this.handleChange}
                />
                <input
                    type="number"
                    name="price2"
                    placeholder="price 2"
                    onChange={this.handleChange}
                />
                <button onClick={this.createAndDownloadPDF}>Download pdf</button>
            </div>
        );
    }
}

export default App;
