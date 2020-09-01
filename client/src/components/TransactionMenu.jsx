import React, { useContext } from 'react';
import styled from 'styled-components';
import { GlobalContext } from '../context/GlobalContext';

const Comp = styled.div`
	position: absolute;
	justify-self: end;

	.menu {
		border-radius: 10px;
		box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
		overflow: hidden;
		position: absolute;
		right: 0px;
		top: 20px;
		opacity: ${(props) => (props.menuShown ? 1 : 0)};
		z-index: ${(props) => (props.menuShown ? 999 : 0)};

		.btn {
			display: flex;
			font-size: 1rem;
			padding: 0.5rem 1rem;
			width: 100%;
			display: grid;
			grid-template-columns: 1fr 3fr;
			align-items: center;
			background: #fff;
			font-weight: 600;

			&-delete:hover {
				background-color: rgb(225, 78, 78);
				color: #fff;
			}

			&-edit:hover {
				background-color: rgb(31, 169, 31);
				color: #fff;
			}

			span {
				margin-right: 0.8rem;
			}
		}
	}
`;

const TransactionMenu = ({ transaction, menuShown, setMenuShown }) => {
	const { deleteTransaction, handlePanel } = useContext(GlobalContext);

	return (
		<Comp menuShown={menuShown} onMouseLeave={() => setMenuShown(false)}>
			<div className='menu'>
				<button
					type='button'
					className='btn btn-delete'
					onClick={() => deleteTransaction(transaction.id)}
				>
					<span role='img' aria-label='delete icon'>
						🗑
					</span>
					<p>Delete</p>
				</button>
				<button
					type='button'
					className='btn btn-edit'
					onClick={() => {
						handlePanel('editMenu', true, transaction.id);
						setMenuShown(false);
					}}
				>
					<span role='img' aria-label='edit icon'>
						✏️
					</span>
					<p>Edit</p>
				</button>
			</div>
		</Comp>
	);
};

export default TransactionMenu;
