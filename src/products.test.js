import React from 'react';
import renderer from 'react-test-renderer';
import Products from './products';

const PROD_LIST  = [
    {
        name: 'Product 1',
        imageUrl: 'prod1.jpg',
        value: 10
    },
    {
        name: 'Product 2',
        imageUrl: 'prod2.jpg',
        value: 20
    },
    {
        name: 'Product 3',
        imageUrl: 'prod3.jpg',
        value: 30
    },
];

test('teste 1', () => {
    const component = renderer.create(
        <Products  />
    );

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

test('teste 2', async () => {
    window.fetch = jest.fn(async () => {
        return {
            json: async () => {
                return PROD_LIST
            }
        }
    });

    const component = renderer.create(
        <Products  />
    );

    setTimeout(function() {
        expect(window.fetch).toHaveBeenCalledWith('https://sleepy-argument.glitch.me/products');
    
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    },1000);

});