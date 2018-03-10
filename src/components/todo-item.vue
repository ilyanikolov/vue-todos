<template>
	<div :class="['todo-item', {completed: todo.completed}]">
		<div v-if="!editing" class="todo-complete with-icon" @click="toggleComplete" v-html="completeIcon"></div>
		<div v-if="!editing" @dblclick="editTodo(todo)" class="todo-title">{{todo.title}}</div>
		<div v-if="!editing" class="todo-archive with-icon" @click="archiveTodo" v-html="archiveIcon"></div>
		<input v-focus
			v-if="editing" class="todo-edit" type="text" 
			v-model="todo.title" @keypress.enter="doneEdit(todo)" @blur="doneEdit(todo)" @keypress.esc="cancelEdit(todo)">
	</div>
</template>
<script>
import feather from "feather-icons";
export default {
	props: ["todo"],
	data() {
		return {
			editing: false,
			editedTodo: null
		}
	},
	methods: {
		toggleComplete() {
			this.todo.completed = !this.todo.completed;	
		},
		archiveTodo() {
			this.$emit('archiveTodo', this.todo);
		},
		editTodo(todo) {
			this.editing = true;
			this.backup = todo.title;
		},
		cancelEdit(todo) {

			todo.title = this.backup;
			this.editing = false;
		},
		doneEdit(todo) {
			todo.title = todo.title.trim();
			if(!todo.title) {
				this.archiveTodo(todo);
			}
			this.editing = false;
		}
	},
	computed: {
		completeIcon() {
			let icon;
			
			this.todo.completed ? 
				icon = feather.icons["check-square"].toSvg() :
				icon = feather.icons["square"].toSvg();

			return icon;
		},
		archiveIcon() {
			return feather.icons["archive"].toSvg();
		}
	},
	directives: {
		'focus': {
			inserted: function(el) {
				el.focus();
			}
		}
	}
}
</script>
<style lang="scss" scoped>
	input[type="text"] {
		background-color: rgba(44,62,80,.03);
	}
	.todo-item {
		display: grid;
		grid-template-rows: 50px;
		grid-template-columns: 50px auto 50px;

		// &:first-child {
		// 	margin-top: 1px;
		// }
		&:not(:last-child) {
			margin-bottom: 1px;
		}

		&:hover {
			.todo-archive {
				opacity: 1;
			}
		}

		.todo-title {
			grid-row: 1;
			grid-column: 1/4;

			background-color: #fff;
			line-height: 50px;
			padding: 0 50px;
			text-align: left;
			
			width: 100%;
			z-index: 1;
			user-select: none;		
		}

		.todo-complete, .todo-archive {
			transition: all .3s ease;

			&:hover {
				.feather {
					opacity: 1;
				}
			}
		}

		.todo-complete {
			cursor: pointer;
			position: relative;
			grid-row: 1;
			grid-column: 1/2;
			z-index: 3;
		}

		.todo-archive {
			cursor: pointer;
			position: relative;
			grid-row: 1;
			grid-column: 3/4;
			z-index: 3;

			opacity: 0;
		}

		.todo-edit {
			grid-row: 1;
			grid-column: 1/4;
		}

		&.completed {
			.todo-complete {
				color: #3EB34F;
				.feather {
					opacity: 1;
				}
			}
			.todo-title {
				text-decoration: line-through;
			}
		}
	}
</style>