<template>
	<header class="header">
		<i class="header__hamburger mdi mdi-text" @click="sidebarToggle"></i>

		<!-- <router-link to="/">
			<div class="logo">
				<i class="mdi mdi-format-strikethrough"></i> Thoughts<strong>Holder</strong> 
			</div>
		</router-link> -->

		<!-- <div class="header__search"> -->
		<form @submit.prevent="search()" class="header__search-form">
			<i class="mdi mdi-magnify"></i>
			<input
				type="search"
				placeholder="Search"
				v-model="inputSearch"
				@focus="searchFocused()"
				@input="search()"
			/>
		</form>
		<!-- </div> -->

		<div class="header__view-theme">
			<div class="header__notes-view" @click="listviewToggle">
				<div></div>
				<div></div>
				<div v-if="isList"></div>
				<div v-if="isList"></div>
			</div>

			<div class="toggle-btn">
				<input
					type="checkbox"
					id="switch"
					class="toggle-btn__chb"
					@change="darkToggle"
					:checked="isDark ? 'checked' : false"
				/>
				<label for="switch" class="toggle-btn__label"></label>
			</div>
		</div>

		<!-- <div class="header__greeting" @click="showToggle"> -->
		<div class="header__login">
			<transition name="scaleopacity">
				<div class="login-email-wrapper" v-if="isDisplayed">
					<p>
						<i class="mdi mdi-email-outline"></i>
						{{ currentUser.email }}
					</p>
					<button class="btn btn--blue" @click.prevent="logout()">
						LOGOUT {{ INPUT_SEARCH }}
					</button>
				</div>
			</transition>
			<span
				class="login-avatar"
				@click.prevent="isDisplayed = !isDisplayed"
				>{{
					currentUser.email ? currentUser.email.split("")[0] : "T"
				}}</span
			>
		</div>
	</header>
</template>

<script>
import { mapActions, mapGetters } from "vuex"

export default {
	name: "Header",

	data() {
		return {
			// isOpen: true,
			isList: false,
			isDark: false,
			show: false,
			isScrolled: false,
			isDisplayed: false,

			inputSearch: "",
		}
	},

	computed: {
		currentUser() {
			return this.$store.getters.GET_USER
		},

		INPUT_SEARCH: {
			get() {
				return this.$store.getters.GET_INPUT_SEARCH
			},
			set(newInput) {
				this.$store.commit("SET_INPUT_SEARCH", newInput)
				// this.inputSearch = newInput
			},
		},
		// ...mapGetters(['GET_USER'])
	},

	methods: {
		...mapActions(["LOGOUT"]),

		sidebarToggle() {
			// document.querySelector('.sidebar').classList.toggle('translateX') // TODO ovo ce ici u modules/ui.js
			// document.querySelector('.grid-container').classList.toggle('grid-sidebar-hidden') // TODO ovo ce ici u modules/ui.js
			// // document.querySelector('.notes').classList.toggle('translateX'); // TODO ovo ce ici u modules/ui.js

			document
				.querySelector(".grid-container")
				.classList.toggle("grid-container--sidebar-show")
		},

		listviewToggle() {
			this.isList = !this.isList
			document.querySelectorAll(".notes").forEach((n) => {
				if (n) n.classList.toggle("is-grid-list--true")
				return
			})
		},

		darkToggle() {
			this.isDark = !this.isDark
			if (this.isDark) {
				// this.trans()
				document.body.setAttribute("data-theme", "dark")
			} else {
				document.body.removeAttribute("data-theme")
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
		},

		displayLogoutBtn() {
			this.isDisplayed = !this.isDisplayed
		},

		searchFocused() {
			if (this.$route.path !== "/search") this.$router.replace("/search")
		},

		search() {
			this.INPUT_SEARCH = this.inputSearch

			// this.$store.commit('SEARCHED_NOTES', this.INPUT_SEARCH)
		},
	},
}
</script>
