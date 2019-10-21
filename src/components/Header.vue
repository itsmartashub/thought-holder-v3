<template>
	<div class="header">

		<div class="header__hamburger" @click="sidebarToggle"></div>

		<router-link to="/" class="header__logo">
			<div class="header__logo">
				<i class="fab fa-think-peaks"></i> Though<strong>Holder</strong> 
			</div>
		</router-link>

		<div class="header__search">
			<form>
				<i class="fas fa-search"></i>
				<input type="search" placeholder="Search"/>
			</form>
		</div>

		<div class="header__notes-view" @click="listviewToggle">
			<div></div>
			<div></div>
			<div v-if="isList"></div>
			<div v-if="isList"></div>
		</div>

		<div class="header__theme" @click="darkToggle">
			<span v-bind:class="{ dark: isDark }"></span>
		</div>

		<!-- <div class="header__greeting" @click="showToggle"> -->
		<div class="header__greeting">
			Hi,&nbsp;<strong>{{ currentUser.email }} </strong>
			<i class="fab fa-staylinked"></i>
			<!-- <span>&rsaquo;</span> -->
			
			<!-- <div class="logout" v-if="show"> -->
				<button class="btn" @click.prevent="logout()">Logout</button>
			<!-- </div> -->
		</div>
	</div>
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
			isScrolled: false
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
			document.querySelector('.sidebar').classList.toggle('translateX'); // TODO ovo ce ici u modules/ui.js
			document.querySelector('.grid-container').classList.toggle('grid-sidebar-hidden'); // TODO ovo ce ici u modules/ui.js
			// document.querySelector('.notes').classList.toggle('translateX'); // TODO ovo ce ici u modules/ui.js
		},

		listviewToggle() {
			this.isList = !this.isList
		},

		darkToggle() {
			this.isDark = !this.isDark
		},

		showToggle() {
			this.show = !this.show
		},

		logout() {
			this.LOGOUT()
		}
	}
}
</script>