import React from 'react';
import { List, Datagrid, TextField, EditButton } from 'react-admin';
import { Create, SimpleForm, TextInput, Edit, ImageInput, ImageField, required, FunctionField, SimpleFormIterator, ArrayInput } from 'react-admin';

const apiUrl = process.env.NODE_ENV === 'production'
    ? 'http://188.120.232.38'
    : 'http://localhost:4554';


const FilenameField = props => {
    return (
        <FunctionField
            {...props}
            render={record => {
                if (record.filename) {
                    return <img src={`${apiUrl}/uploads/${record.filename}`} alt={record.filename} title="image" />;
                } else {
                    return <img src={`${record.src}`} alt={record.src} title="image" />;
                }
            }}
        />
    )
}

export const RaitingsList = (props) => (
    <List {...props}>
        <Datagrid rowClick="edit">
            <TextField source="name" />
            <EditButton />
        </Datagrid>
    </List>
);

export const RaitingsCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="name" label="Название" validate={[required()]} />
            <ImageInput source="image" label="Иконка" validate={[required()]} accept="image/*">
                <ImageField source="src" title="title" />
            </ImageInput>
            <ArrayInput
                source="raitingProject"
                label="Номинант"
                validate={[required()]}
            >
                <SimpleFormIterator>
                    <TextInput source="raitingPlace" label="Какое место " />
                    <TextInput source="raitingName" label="Номинация" />
                    <TextInput source="raitingYear" label="Год" />
                </SimpleFormIterator>
            </ArrayInput>
        </SimpleForm>
    </Create>
);

export const RaitingsEdit = (props) => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput source="name" label="Название" validate={[required()]} />
            <ImageInput source="image" label="Картинка" validate={[required()]} accept="image/*">
                <FilenameField source="image" title="title" />
            </ImageInput>
            <ArrayInput
                source="raitingProject"
                label="Номинант"
                validate={[required()]}
            >
                <SimpleFormIterator>
                    <TextInput source="raitingPlace" label="Какое место " />
                    <TextInput source="raitingName" label="Номинация" />
                    <TextInput source="raitingYear" label="Год" />
                </SimpleFormIterator>
            </ArrayInput>
        </SimpleForm>
    </Edit>
);