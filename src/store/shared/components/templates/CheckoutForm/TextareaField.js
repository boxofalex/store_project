import React from 'react';

import styles from './TextareaFiled.module.scss';

const TextareaField = field => (
	<div className={styles.textAreaField}>
		<label htmlFor={field.id}>
			{field.label}
			{field.meta.touched &&
				field.meta.error && <span className="error">{field.meta.error}</span>}
		</label>
		<textarea
			{...field.input}
			placeholder={field.placeholder}
			rows={field.rows}
			id={field.id}
			className={field.meta.touched && field.meta.error ? 'invalid' : ''}
		/>
	</div>
);

export default TextareaField;
