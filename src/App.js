import React, {Component} from 'react';
import XTable from "./dt-table/XTable";
import {fakeData} from './utils/fakeData'

const columns = [
    {
        data: 'id',
        title: 'Id',
        width: 30,
        defaultContent: '',
    },
    {
        data: 'city',
        title: 'City',
        width: 100,
        defaultContent: '',
    },
    {
        data: 'email',
        title: 'Email',
        width: 100,
        defaultContent: '',
    },
    {
        data: 'firstName',
        title: 'First Name',
        width: 150,
        defaultContent: '',
    },
    {
        data: 'lastName',
        title: 'Last Name',
        width: 150,
        defaultContent: '',
    },
    {
        data: 'sentence',
        title: 'Sentence',
        width: 200,
        defaultContent: '',
    }
]

class App extends Component {
    render() {
        const data = fakeData(100)
        return (
            <div className='container-fluid'>
                <XTable
                    primaryKey='id'
                    data={data}
                    columns={columns}
                />
            </div>
        );
    }
}

export default App;
