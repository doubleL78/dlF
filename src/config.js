module.exports = {
    debug: true,
    copyright: ' power by doublel ',
    systemname: '测试系统',
    mainFrame: {
        sideBarWidth: 260
    },
    apiUrl: 'http://127.0.0.1:8888',
    apiTimeout: 10000,
    normalLayout: {
        gutter: 0,
        compWidth: 240,
        cols: 2,
        colItem: {
            label: 120,
            wrapper: 280
        }
    },
    formControl: {
        selectAllText: '= 全部'
    },
    pageOptions: {
        defaultPageSize: 15,
        pageSizeOptions: ['10', '20', '50', '100']
    },
    dataFormat: 'YYYY-MM-DDThh:mm:ssZ',
    dataFormatReg: /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/
};
