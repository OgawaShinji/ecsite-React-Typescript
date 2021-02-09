import {postRegisterUser, userSlice} from "~/store/slices/Domain/user.slice";

const reducer = userSlice.reducer
const initialState = {}

describe( "userSlice Test" ,  () => {

    describe( "extraReducers" , () => {
        it( "postRegisterUser fulfilled" ,  async () => {
            //データを適切に送ることができた提でresを定義？
            const res = {};
            const action = {type: postRegisterUser.fulfilled.type, payload: res}
            reducer(initialState, action);
            await expect(action.payload).toBe("200")
        })

        it('postRegisterUser rejected', () => {
            //データを適切に送ることができず、errorが返ってきた提でerrorを定義？
            const action = {type: postRegisterUser.rejected.type, error: {message: '404 Error'}};
            let msg: string
            try {
                reducer(initialState, action);
            } catch (e) {
                msg = e.message;
            }
            expect(msg!).toBe('404 Error')
        })
    })

})