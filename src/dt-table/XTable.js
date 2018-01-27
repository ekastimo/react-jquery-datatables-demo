import React from 'react'
import moment from 'moment'
import PropTypes from 'prop-types'
import 'datatables.net-bs4/css/dataTables.bootstrap4.css'
import 'datatables.net-responsive-dt/css/responsive.dataTables.css'
import 'datatables.net-select-dt/css/select.dataTables.css'
import 'datatables.net-buttons-bs4/css/buttons.bootstrap4.min.css'
import $ from "jquery"

$.DataTable = require('datatables.net')
require('datatables.net-responsive')
require('datatables.net-select')
require('datatables.net-bs4/js/dataTables.bootstrap4.js')
require('datatables.net-buttons-bs4/js/buttons.bootstrap4.js')
require('datatables.net-buttons/js/buttons.html5.js')
require('datatables.net-buttons/js/buttons.colVis.js')
require('datatables.net-buttons/js/buttons.print.js')

export default class XTable extends React.Component {
    static propTypes = {
        primaryKey: PropTypes.any.isRequired,
        data: PropTypes.array.isRequired,
        config: PropTypes.object.isRequired,
    }

    constructor(props) {
        super(props);
        const {data, config} = props
        this.data = data
        this.columns = convertColumns(config.columns)
        this.datatable = undefined
    }

    shouldComponentUpdate() {
        // Don't let react update this component
        return false
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.data !== nextProps.data) {
            this.loadNewData(nextProps.data)
        }
    }

    componentWillUnmount() {
        // Destroy the table as we un-mount
        $(this.table)
            .DataTable()
            .destroy(true)
    }

    componentDidMount() {
        this.datatable = $(this.table).DataTable({
            columns: this.columns,
            data: this.data,
            autoWidth: false,
            responsive: responsiveConfig,
            pagingType: "full",
            select: {
                style: 'multi'
            },
            buttons: [
                'print',
                'copyHtml5',
                'excelHtml5',
                'csvHtml5',
                'pdfHtml5'
            ],
            //dom: 'Bfrtip',
        })
        setTimeout(() => {
            this.datatable.columns.adjust().draw()
        }, 200)
    }



    render() {
        return (
            <div style={{width: '100%'}}>
                <div className='row row justify-content-md-center'>
                    <div className='col-md-6 '>
                        <button className='btn btn-sm btn-success' onClick={this._export}>Trigger</button>
                    </div>
                </div>
                <table className="table table-striped table-bordered table-hover " cellSpacing="0"
                       style={{width: '100%'}}
                       ref={ref => {
                           this.table = ref
                       }}/>
            </div>
        )
    }

    /**
     * Do a local search on the data table
     * @param value string
     */
    doSearch(value: String) {
        this.datatable.search(value).draw()
    }

    /**
     * Load New data to the table
     * @param newDataArray
     */
    loadNewData(newDataArray: Array) {
        if (this.datatable) {
            this.datatable.clear()
            this.datatable.rows.add(newDataArray)
            this.datatable.draw()
            this.data = newDataArray
        }
    }

    /**
     * Returns the selected data
     * @returns {Array}
     */
    getSelected() {
        const selected = this.datatable.rows({selected: true}).data()
        const data = []
        for (let i = 0; i < selected.length; i++) {
            data.push(selected[i])
        }
        return data
    }

    /**
     * Delete a record from the table
     * @param recId
     */
    handleDelete(recId) {
        const {primaryKey = 'id'} = this.props
        const records = this.data.filter(rec => rec[primaryKey] !== recId)
        this.loadNewData(records)
    }

    /**
     * Edit a record
     * @param edited
     */
    handleEdit(edited) {
        const {primaryKey = 'id'} = this.props
        const records = this.data.map(rec => {
            if (rec[primaryKey] === edited[primaryKey]) {
                return edited
            } else {
                return rec
            }
        })
        this.loadNewData(records)
    }

    /**
     * Add a new record
     * @param rec
     */
    handleNew(rec) {
        this.datatable.row.add(rec).draw()
    }


    printData = () => {
        this.datatable.button(0).trigger()
    }

    copyData = () => {
        this.datatable.button(1).trigger()
    }

    exportExcel = () => {
        this.datatable.button(2).trigger()
    }

    exportCSV = () => {
        this.datatable.button(3).trigger()
    }

    exportPDF = () => {
        this.datatable.button(4).trigger()
    }
}

const convertColumns = (columns = []) => {
    return columns.map(({name, label, width, type, valueField, path}) => {
        if (type === 'link')
            return {
                title: label,
                width: width,
                data: name,
                defaultContent: '',
                'render': function (data, type, row) {
                    return `<a href='${row[valueField]}' target="_blank">${data}</a>`
                }
            }
        else if (type === 'local-link') {
            return {
                title: label,
                width: width,
                data: name,
                defaultContent: '',
                'render': function (data, type, row) {
                    return `<a href='#${path}/${row[valueField]}' >${data}</a>`
                }
            }
        } else if (type === 'date') {
            return {
                title: label,
                width: width,
                data: name,
                defaultContent: '',
                'render': function (data, type, row) {
                    return data ? moment(data).format('YYYY/MM/DD') : ''
                }
            }
        } else if (type === 'date-time') {
            return {
                title: label,
                width: width,
                data: name,
                defaultContent: '',
                'render': function (data, type, row) {
                    return data ? moment(data).format('YYYY/MM/DD hh:mm:ss') : ''
                }
            }
        }
        else
            return {
                title: label,
                width: width,
                data: name,
                defaultContent: '',
            }
    })
}

const responsiveConfig = {
    details: {
        renderer: function (api, rowIdx, columns) {
            const rows = columns.map(col => {
                const row = `
                            <tr data-dt-row='${col.rowIndex}' data-dt-column='${col.columnIndex}' >
                                <td><label class="text-nowrap"><b>${col.title}</b></label></td>
                                <td>${col.data}</td>
                            </tr>                    
                        `
                return col.hidden ? row : '';
            }).join('')
            const table = `<table class="table-sm table-bordered">${rows}</table>`
            return rows ? table : false;
        }
    }
}