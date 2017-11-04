 import Ember from 'ember';

export default Ember.Component.extend({
	store: Ember.inject.service('store'),

	actions:{
		save(){
			let examen = this.get('examen');
			let component = this;
			if( Ember.isBlank( examen.get('nombre') ) ){
				alert('Introduce un nombre para el examen');
				return;
			}
	

			let canSave = true;

			
				this.get('examen.preguntas').forEach((pregunta)=>{

					if(pregunta.get('id')!=this.get('examen.preguntas.lastObject.id')){
						if(this.get('examen.preguntas.lastObject.nombre')==pregunta.get('nombre')){
							canSave=false;
						}
					}
					
			
			})
			if(canSave){
				examen.save().then(()=>{
				return Ember.RSVP.all(examen.get('preguntas').invoke('save')).then((arreglo)=>{
					let promises= [];

					arreglo.forEach((element)=>{
						promises.push(element.get('options').invoke('save'));

					});

					Ember.RSVP.all(promises).then(()=>{
						alert('Guardado correctamente')
					});
				})
			}); 

			}else{
				alert('Pregunta ya se encuentra registrada')
				return;
			}

		},

		saveQuestion(){
			let question = this.get('store').createRecord('question', {
				examen: this.get('examen')
			});
			let res1 = question.get('options').createRecord({
                question: question
            });
            let res2 = question.get('options').createRecord({
                question: question
            });
            let res3 = question.get('options').createRecord({
                question: question
            });
		}
	}
});


