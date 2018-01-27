export const tableConfig = {
    columns: [
        {
            name: "id",
            label: "Id",
            type: "text",
            width: 20,
            extras: {
                isResizable: true,
                minWidth: 100,
                maxWidth: 300,
            },
        },
        {
            name: "city",
            label: "city",
            type: "text",
            width: 100,
            extras: {
                isResizable: true,
                minWidth: 100,
                maxWidth: 300,
            },
        },
        {
            name: "email",
            label: "Email",
            type: "text",
            width: 100,
            extras: {
                isResizable: true,
                minWidth: 100,
                maxWidth: 300,
            },
        },
        {
            name: "firstName",
            label: "First Name",
            type: "text",
            width: 100,
            extras: {
                isResizable: true,
                minWidth: 100,
                maxWidth: 300,
            },
        },
        {
            name: "lastName",
            label: "Last Name",
            type: "text",
            width: 100,
            extras: {
                isResizable: true,
                flexGrow: 1,
            },
        },
        {
            name: "sentence",
            label: "Sentence",
            type: "text",
            width: 200,
            extras: {
                isResizable: true,
                flexGrow: 1,
            },
        }

    ],
};