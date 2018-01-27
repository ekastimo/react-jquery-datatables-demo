import React, {Component} from 'react';
import XTable from "./dt-table/XTable";
import {tableConfig} from './config'
import {fakeData} from './utils/fakeData'
const $ = require('jquery');
$.DataTable = require('datatables.net');

class App extends Component {
    render() {
        const data = fakeData(100)
        return (
            <div className='container-fluid'>
                <XTable data={data} config={tableConfig}/>
            </div>
        );
    }
}

export default App;
