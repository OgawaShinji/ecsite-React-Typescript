import React from "react";
import {render, screen, cleanup, act} from "@testing-library/react";
import OptionForm from "~/components/itemList/OptionForm";
import userEvent from "@testing-library/user-event";


afterEach(() => {
    cleanup();
})

describe('OptionForm Component Test', () => {
    it('test', async () => {
        const label = 'ラベル';
        const value = 9;
        const optionItems = [
            {
                value: 9,
                label: '9件'
            },
            {
                value: 18,
                label: '18件'
            }
        ];
        const handleChange = jest.fn();

        render(
            <OptionForm label={label} value={value} optionItems={optionItems} handleChange={handleChange}/>
        );

        // label
        expect(screen.getByRole('inputLabel').textContent).toBe('ラベル');

        // value
        expect(screen.getByRole('button').textContent).toBe('9件');

        // optionItem, handleChange
        const selectEl = screen.getByRole('button');
        await act(async () => {
            await userEvent.click(selectEl);
            await userEvent.click(screen.getByText('18件'));
        })
        expect(handleChange).toBeCalled();
        expect(screen.getByRole('formControl').classList[1]).toBe('makeStyles-formControl-1');
    })

    it('test2', () => {
        const label = 'ラベル';
        const value = 18;
        const optionItems = [
            {
                value: 9,
                label: '9件'
            },
            {
                value: 18,
                label: '18件'
            }
        ];
        const handleChange = jest.fn();

        render(
            <OptionForm label={label} value={value} optionItems={optionItems} handleChange={handleChange}/>
        );

        // value
        expect(screen.getByRole('button').textContent).toBe('18件');
    })
})