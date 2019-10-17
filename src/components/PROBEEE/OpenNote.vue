<template>

	<!-- <div> -->
		<h1>ALOOOOO</h1>
		<!-- <article class="note mb-2 open-note" ref="refNote">
			<div class="note__title-container mb-1">
				<div
					class="note__title"
					contenteditable="true"
					data-placeholder="Title"
					v-text="note.title"
					@blur="editTitle"
				>
				</div>
				<i class="fas fa-thumbtack note__pinned" title="Pin note" @click="onPinned" :class="{'txt-blue': note.pinned}"></i>
			</div>

			<div
				class="note__body"
				ref="refContent"
				contenteditable="true"
				data-placeholder="Take a note..."
				v-text="note.content"
				@blur="editContent"
			></div>

			<h4 class="note__tag mt-3">neki tag</h4>

			<div class="note__footer">
				<div class="note__options mt-1 open-note-opacity">

					<div class="note__add-tags" >
						<i class="fas fa-tags" title="Add tag" @click="tagsOpen = !tagsOpen"></i>

						<form class="note__add-tags-container" @submit.prevent v-if="tagsOpen">
							<h4>Tag note</h4>
							<input type="text" placeholder="Enter tag name">
							<ul>
								<li>
									<label for="KEY1"><input type="checkbox" id="KEY1"></label>
								</li>

								<li>
									<label for="KEY2"><input type="checkbox" id="KEY2">IME TAGA </label>
								</li>

								<li>
									<label for="KEY3"><input type="checkbox" id="KEY3">IME TAGA </label>
								</li>
							</ul>

							<button class="btn mt-2" @click.prevent>add tag</button>
						</form>
					</div>

					<div class="note__pallete">
						<i class="fas fa-palette" title="Change color"></i>

						<div class="note__colors-container">
							<div class="color-1 red"></div>
							<div class="color-2 blue"></div>
							<div class="color-3 green"></div>
							<div class="color-4 purple"></div>
							<div class="color-5 orange"></div>
							<div class="color-6 grey"></div>
						</div>
					</div>
					
					<i class="fas fa-archive" title="Archive" @click="onArchived" :class="{'txt-blue': archived}"></i>
					<i class="fas fa-trash" title="Delete" @click="onDelete(note.id)"></i>
				</div>


				<div class="note__btn-container">
					<button class="btn btn--blue" @click.prevent="editNote(note.id)">edit note</button>
					<button class="btn" @click.prevent="closeNote">close</button>
				</div>
			</div>

		</article>

		<div class="open-note-background" @click="closeNote"></div> -->
	<!-- </div> -->
</template>

<script>

export default {
	name: 'open-note',
	
	// props: {
	// 	note: Object
	// }

	// props: ['note']
}
</script>