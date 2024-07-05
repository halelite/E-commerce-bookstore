import { useContext, useEffect, useRef, useState } from "react"
import { GobalContext } from "../context/auth-context"
import Layout from "./Layout";
import plus from "../assets/icons/add_24dp_FILL0_wght300_GRAD0_opsz24.svg";
import minus from "../assets/icons/remove_24dp_FILL0_wght300_GRAD0_opsz24.svg";

function Cart() {

    const {state, dispatch} = useContext(GobalContext);
    const ref = useRef();
    const ref2 = useRef();

    function handleIncrease(id, book) {

        const c = JSON.parse(state.bookCount.find(item => {
            return item.title == book.title
        }).count) + 1;

        dispatch({
            type: "EDIT_ITEM",
            payload: book,
            count: c
        });
        updateChangeNumber(id, c);
    }

    function handleDecrease(id, book) {

        const c = JSON.parse(state.bookCount.find(item => {
            return item.title == book.title
        }).count) - 1;
        
        if(c == 0) {
            dispatch({
                type: "DELETE_ITEM",
                payload: book,
            })
        } else {
            dispatch({
                type: "EDIT_ITEM",
                payload: book,
                count: c
            })
        }
        updateChangeNumber(id, c);
    }

    function updateChangeNumber(id, c) {
       
            for(let i = 0; i < state.boughtBooks.length; i++) {
                if(ref.current.children[i].classList.contains(`li-${id}`)) {
                    ref.current.children[i].getElementsByClassName(`item${id}`).innerHTML = c;
                }
            }
    }

    useEffect(() => {
        let booksLength = state.bookCount.length;
        let fullPrice = 0;
        if(booksLength > 0) {
            for(let i = 0; i < booksLength; i++) {
                fullPrice += state.bookCount[i].count * state.boughtBooks[i].price;
            }
        } else {
            fullPrice = 0;
        }
        ref2.current.innerHTML = fullPrice;

        console.log(state);
    }, [state])


    let boughtItems = '';
    if(state.boughtBooks.length > 0) {
        boughtItems = state.boughtBooks.map(book => {
            const itemCount = state.bookCount.find(b => b.title == book.title).count;
            const itemPrice = (book.price * itemCount).toLocaleString();
            return (
                <li className={`li-${book.id}`} key={book.id}>
                    <div className="book-shopped">
                        <img src={book.image} alt="book" />
                        <div className="shop-info">
                            <p>{book.title}</p>
                            <p>{book.author}</p>
                        </div>
                    </div>
                    <div className="price-info">
                        <div className="change-count">
                            <div
                            onClick={() => handleIncrease(book.id, book)}
                            className="increase">
                                <img src={plus} alt="plus" />
                            </div>
                            <div className="number">
                                <span className={`item${book.id}`}>
                                    {itemCount}
                                </span>
                            </div>
                            <div 
                            onClick={() => handleDecrease(book.id, book)}
                            className="decrease">
                                <img src={minus} alt="minus" />
                            </div>
                        </div>
                        <p className={'price'}>{itemPrice} <span>تومان</span></p>
                        
                    </div>
                </li>
            )
        })
    }

    return (
        <Layout>
            <div className="carts-section">
                <p>سبد خرید</p>
                <div className="main-cart">
                    <ul ref={ref}>
                        {boughtItems ? boughtItems : 'سبد خرید شما خالی است.'}
                    </ul>
                    <div className="final-check">
                        <p>قیمت کل: 
                            <span 
                            ref={ref2}
                            className="full-price"></span>
                        </p>
                        <button type="button">
                            پرداخت
                        </button>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Cart