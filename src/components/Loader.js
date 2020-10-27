import React from 'react';
import { GridLoader } from 'react-spinners';

export default function Loader({ loading, color, ...rest }) {
    return (
        <GridLoader loading={loading} color={color || ' #4A7349'} {...rest} />
    );
};