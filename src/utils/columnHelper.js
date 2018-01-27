import moment from "moment/moment";

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