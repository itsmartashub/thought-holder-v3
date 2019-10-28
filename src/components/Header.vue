<template>
	<header class="header">

		<i class="header__hamburger mdi mdi-text" @click="sidebarToggle"></i>

		<router-link to="/">
			<div class="logo">
				<i class="mdi mdi-format-strikethrough"></i> Though<strong>Holder</strong> 
			</div>
		</router-link>

		<div class="header__search">
			<form @submit.prevent="search()">
				<i class="mdi mdi-magnify"></i>
				<input type="search" placeholder="Search" v-model="inputSearch"/>
			</form>

			<div class="header__notes-view" @click="listviewToggle">
				<div></div>
				<div></div>
				<div v-if="isList"></div>
				<div v-if="isList"></div>
			</div>

			<!-- <div class="header__theme" @click="darkToggle">
				<span v-bind:class="{ dark: isDark }"></span>
			</div> -->
			<!-- <label class="toggle">
				<input 
					type="checkbox" 
					:checked="isDark ? 'checked' : false" 
					@change="darkToggle"
				/>
				<span class="toggler round"></span>
			</label> -->
			<div class="toggle-wrapper">
				<input type="checkbox" id="switch" class="toggle-input" @change="darkToggle" :checked="isDark ? 'checked' : false" />
				<label for="switch" class="toggle-label"></label>
			</div>
		</div>

		

		<!-- <div class="header__greeting" @click="showToggle"> -->
		<div class="header__login">
			<i class="mdi mdi-email-outline"></i>
			<p class="underline">{{ currentUser.email }} </p>
			<button class="btn btn--blue" @click.prevent="logout()">Logout</button>
		</div>

	</header>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
	name: 'Header',

	data() {
		return {
			// isOpen: true,
			isList: false,
			isDark: false,
			show: false,
			isScrolled: false,

			inputSearch: ''
		}
	},

	computed: {
		currentUser() {
			return this.$store.getters.GET_USER
		}
		// ...mapGetters(['GET_USER'])
	},

	methods: {
		...mapActions(['LOGOUT']),

		sidebarToggle() {
			document.querySelector('.sidebar').classList.toggle('translateX') // TODO ovo ce ici u modules/ui.js
			document.querySelector('.grid-container').classList.toggle('grid-sidebar-hidden') // TODO ovo ce ici u modules/ui.js
			// document.querySelector('.notes').classList.toggle('translateX'); // TODO ovo ce ici u modules/ui.js
		},

		listviewToggle() {
			this.isList = !this.isList
		},

		darkToggle() {
			this.isDark = !this.isDark
			if(this.isDark) {
				// this.trans()
				document.body.setAttribute('data-theme', 'dark')
			} else {
				document.body.removeAttribute('data-theme')
			}
		},
		// trans() {
		// 	document.documentElement.classList.add('transition')
		// 	window.setTimeout(() => {
		// 		document.documentElement.classList.remove('transition')
		// 	}, 1000)
		// },

		showToggle() {
			this.show = !this.show
		},

		logout() {
			this.LOGOUT()
		}
	}
}
</script>