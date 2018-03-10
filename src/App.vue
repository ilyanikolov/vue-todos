<template>
    <div>
    <div id="app">
        
        <section id="header">
            <div class="header-checkall with-icon"
                @click="toggleTodos"
                v-if="todos.length" 
                v-html="checkallIcon"></div>
            <div class="header-input">
                <input autofocus
                    v-model="title"
                    @keypress.enter="createTodo()"
                    type="text" 
                    placeholder="What needs to be done? ">
            </div>
            <div class="header-clear with-icon" @click="title = ''" v-show="title" v-html="clearIcon"></div>
        </section>
        <section id="content" :class="{scrollable: todos.length > 8}">
            <div class="todo-list">
                <todo-item 
                    v-for="(todo, index) in filteredTodos"
                    @archiveTodo="archiveTodo(todo)"
                    :key="index"
                    :todo="todo" />
            </div>
        </section>
        <section id="footer" v-if="todos.length">
            <div class="footer-counter with-icon" v-html="counterIcon"></div>
            <div :class="['footer-filter with-icon', {active: filtering}]" @click="filtering = !filtering" v-html="filterIcon"></div>
            <div :class="['footer-filter-list', {show: filtering}]">
                <router-link :to="{name: 'filter', params: {filter: 'all'}}" tag="div" class="list-item">All</router-link>
                <router-link :to="{name: 'filter', params: {filter: 'active'}}" tag="div" class="list-item">Active</router-link>
                <router-link :to="{name: 'filter', params: {filter: 'completed'}}" tag="div" class="list-item">Completed</router-link>
            </div>
        </section>

    </div>

    <section id="info">
        <p>Double-click to edit todo</p>
        <p>Written by Ilian Nikolov</p>
        <p><a href="https://feathericons.com/">Icons </a>by @colebemis</p>
    </section>
    </div>
</template>

<script>
import feather from 'feather-icons';
import {store} from './store';
import TodoItem from './components/todo-item';
const filter = {
    all: function(todos) {
        return todos;
    },
    active: function(todos) {
        return todos.filter(todo => !todo.completed);
    },
    completed: function(todos) {
        return todos.filter(todo => todo.completed);
    }
};
export default {
    name: 'app',
    components: {
        todoItem: TodoItem
    },
    data () {
        return {
            todos: store.fetch(),
            title: "",
            toggle: true,
            filtering: false,
            filter: this.$route.params.filter
        }
    },
    computed: {
        checkallIcon() {
            return feather.icons["chevron-down"].toSvg();
        },
        clearIcon() {
            return feather.icons["delete"].toSvg();
        },
        counterIcon() {
            let icon =  feather.icons["hash"].toSvg();
            let count = this.remaining ? this.remaining : "";
            let cls = this.remaining ? (this.remaining > 10 ? "badge red" : "badge" ): "badge green";
            return icon + `<span class="${cls}">${count}</span>`;
        },
        filterIcon() {
            return feather.icons["filter"].toSvg();
        },
        remaining() {
            return this.todos.reduce((acc,item) => {item.completed ? acc : acc++; return acc;}, 0);
        },
        filteredTodos() {
            return filter[this.filter](this.todos);
        }
    },
    methods: {
        createTodo() {
            let title = this.title && this.title.trim();
            if(!title) {
                return;
            }
            this.todos.push({title: title, completed: false});
            this.title = "";
        },
        archiveTodo(todo) {
            let index = this.todos.indexOf(todo);
            this.todos.splice(index, 1);
        },
        toggleTodos() {
            this.todos.forEach(item => item.completed = this.toggle);
            this.toggle = !this.toggle;
        }
    },
    watch: {
        todos: {
            deep: true,
            handler: store.save
        },
        '$route.params.filter': function(data) {
            this.filter = data;
        }
    }
}
</script>

<style lang="scss">

* {
    box-sizing: border-box;
    outline: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}

html {
    font-size: 62.5%;
}

body {
    height: 100vh;
    margin: 0;
    padding: 0;
    background-color: #f2f6fc;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    font-size: 1.6rem;
    color: #2c3e50;

    display: flex;
    justify-content: center;
    align-items: center;
}

input[type="text"] {
    border: none;
    padding: 0 25px 0 50px;
    width: 100%;
    height: 100%;

    font-family: inherit;
    font-size: inherit;

    &::placeholder {
        color: #cbcbcb;
    }
}

a {
    color: inherit;
    // text-decoration: none;
}

.with-icon {
    display: flex;
    justify-content: center;
    align-items: center;

    z-index: 3;
}

#app {
    

    width: 450px;

    box-shadow: 0 20px 20px -20px rgba(0,0,0,.15);
}

#header, #footer {
    position: relative;
    display: grid;
    grid-template-rows: 50px;
    grid-template-columns: 50px auto 50px;
}

#header {
    margin-bottom: 1px;

    .header-checkall {
        grid-row: 1;
        grid-column: 1/2;
    }

    .header-clear {
        grid-row: 1;
        grid-column: 3/4;
    }

    .header-input {
        grid-row: 1;
        grid-column: 1/4;
    }
}

#content {
    max-height: 407px;
    
    &.scrollable {
        overflow-y: scroll;
    }
}

#footer {
    background-color: #fff;
    margin-top: 1px;
    overflow: hidden;    

    .footer-counter {
        position: relative;
        grid-row: 1;
        grid-column: 1/2;

        .badge {
            position: absolute;
            z-index: 5;
            top: 20%;
            left: 50%;
            font-size: .9rem;
            display: block;
            padding: 0px 4px;
            margin: 0;
            line-height: 12px;
            height: 16px;
            min-width: 16px;
            border: 2px solid #fff;
            border-radius: 12px;
            background-color: #F89B0F;
            color: #fff;

            &.red {
                background-color: #ED3146;
            }

            &.green {
                background-color: #3EB34F;
            }
        }
    }
    .footer-filter {
        grid-row: 1;
        grid-column: 3/4;
        cursor: pointer;

        &.active {
            color: #fff;
            &:after {
                position: absolute;
                content: "";
                width: 30px;
                height: 30px;
                border-radius: 20px;
                background-color: #2c3e50;
                z-index: 1;
                transition: all .3s ease;

            }
        }

        
    }
    .footer-filter-list {
        grid-row: 1;
        grid-column: 2/3; 
        display: flex;
        align-items: center;
        justify-content: center;
        transform: translate(0,50px);

        transition: all .3s ease;

        &.show {
            transform: translate(0,0);
            // transition: all 1s ease-in;
        }

        .list-item {
            font-size: 1rem;
            text-transform: uppercase;
            padding: 4px 15px;
            cursor: pointer;

            &.active {
                background-color: #2c3e50;
                color: #fff;
                border-radius: 4px;
            }
        }
    }
}

.feather {
    width: 16px;
    height: 16px;

    cursor: pointer;
    z-index: 5;
}

#info {
    padding: 25px 0;
    font-size: 1rem;
    letter-spacing: 1px;
    color: #afafaf;

    p {
        margin-top: 0;
    }
}

::-webkit-scrollbar {
    width: 0;
}
</style>
