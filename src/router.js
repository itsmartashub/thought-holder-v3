import Vue from 'vue'
import Router from 'vue-router'

// import store from './stores/store' // your vuex store 

import Home from './components/Home.vue'
import Archive from './components/Archive.vue'
import Tags from './components/Tags.vue'

import Login from './components/auth/Login.vue'
import Signup from './components/auth/Signup.vue'

import firebase from 'firebase/app';
import 'firebase/auth';

Vue.use(Router)

const router = new Router({
	mode: 'history',
	base: process.env.BASE_URL,
	routes: [
		{
			path: '/',
			name: 'home',
			component: Home,
			meta: {
				requiresAuth: true
			},
			children: [
				// {
				// 	path: 'notes/:IDnote',
				// 	name: 'open-note',
				// 	components:{
				// 		default: Note,
				// 		'open-modal': OpenNote
				// 	},
				// 	props: true
				// },

				// {
				// 	path: ':IDnote',
				// 	name: 'note',
				// 	component: Note
				// },

				{
					path: 'tags/:tagName',
					name: 'tags',
					component: Tags,
					props: true
				},
				{
					path: 'archived',
					name: 'archived',
					component: Archive
				}
			]
		},

		// { path: '/', name: 'home', component: Home },
		// { path: '/tags/:tagName', name: 'tags', component: { Tags } },
		// { path: '/archived', name: 'archived', component: { Archive } },

		// { path: '/notes', name: 'notes', component: Notes },
		{ path: '/login', name: 'login', component: Login, meta: { requiresGuest: true }},
		{ path: '/signup', name: 'signup', component: Signup, meta: { requiresGuest: true }},

		{ path: '*', redirect: { name: 'notes' } }
	]
})


// Nav Guard
router.beforeEach((to, from, next) => {
  // Check for requiresAuth guard
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // Check if NO logged user
    if (!firebase.auth().currentUser) {
      // Go to login
      next({ path: '/login' });
    } else {
      // Proceed to route
      next();
    }
  } else if (to.matched.some(record => record.meta.requiresGuest)) {
    // Check if NO logged user
    if (firebase.auth().currentUser) {
      // Go to login
      next({ path: '/' });
    } else {
      // Proceed to route
      next();
    }
  } else {
    // Proceed to route
    next();
  }
});

export default router 
