import {act, cleanup, render, screen} from "@testing-library/react";
import {MockedProvider} from '@apollo/client/testing';
import ItemDetailGQL from "~/components/itemDetail/index.gql";
import {AddCartDocument, FetchItemDocument} from "~/generated/graphql";
import userEvent from "@testing-library/user-event";
import {Path} from "~/router/routes";

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom") as {},
    useParams: () => ({
        itemId: "SXRlbVR5cGU6MQ=="
    }),
    useHistory: () => ({
        push: jest.fn().mockImplementation((to: string) => {
            methodStatus.history = to;
        })
    })
}));
type methodStatusType = {
    url: string;
    history: string;
    requestBody: any
}
let methodStatus: methodStatusType = {
    url: '',
    history: '',
    requestBody: null
};
const itemFromDB = {
    "id": "SXRlbVR5cGU6MQ==",
    "name": "じゃがバターベーコン",
    "description": "ホクホクのポテトと旨味が凝縮されたベーコンを特製マヨソースで味わって頂く商品です。バター風味豊かなキューブチーズが食材の味を一層引き立てます。",
    "priceM": 1490,
    "priceL": 2570,
    "imagePath": "http://34.84.118.239/static/img/item/1.jpg",
    "deleted": false
}
const mocks = [
    {
        request: {
            query: FetchItemDocument,
            variables: {
                id: 'SXRlbVR5cGU6MQ==',
            },
        },
        result: {
            data: {
                item: itemFromDB,
            },
        },
    },
    {
        request: {
            query: FetchItemDocument,
            variables: {
                id: '1',
            },
        },
        result: {
            data: null,
        },
    },
    {
        request: {
            query: AddCartDocument,
            variables: {
                "orderItem":
                    {
                        "id": "orderItem id",
                        "item": "SXRlbVR5cGU6MQ==",
                        "orderToppings": [],
                        "size": "M",
                        "quantity": 1
                    },
                "totalPrice": 1490
            },
        },
        result: {
            data: {
                order: {
                    id: ""
                }
            }
        },
    },
    {
        request: {
            query: AddCartDocument,
            variables: {}
        },
        result: {
            data: {},
            error: {
                "errors": [
                    {
                        "message": "Variable \"$orderItem\" of required type \"OrderItemInput!\" was not provided.",
                        "locations": [
                            {
                                "line": 1,
                                "column": 15
                            }
                        ]
                    }
                ]
            }
        }
    }
];
afterEach(() => {
    cleanup();
    jest.resetAllMocks();
    methodStatus.history = '';
    methodStatus.url = '';
    methodStatus.requestBody = null;
});
describe('商品詳細', () => {
    it('renders without error', async () => {

        render(
            <MockedProvider mocks={mocks} addTypename={false}>
                <ItemDetailGQL/>
            </MockedProvider>,
        );

        expect(screen.getByRole('progressbar')).toBeTruthy();
        expect(await screen.findByText(itemFromDB.name)).toBeTruthy();

        await act(async () => {
            await userEvent.click(screen.getByRole('button', {name: '商品をカートに入れる', hidden: true}))
            expect(screen.getByRole('progressbar')).toBeTruthy();
        })
        expect(methodStatus.history).toBe(Path.cart)
    });
})
