import React from 'react';

import styles from './InputField.module.scss';

const InputField = field => (
	
	<div className={styles.formItem}>
		<label htmlFor={field.id} className={styles.formItemLabel}>
			{field.label}
			{field.meta.touched &&
				field.meta.error && <span className="error">{field.meta.error}</span>}
		</label>
		<input
		    className={styles.formItemInput}
			{...field.input}
			placeholder={field.placeholder}
			type={field.type}
			id={field.id}
			value={field.value}
			// className={field.meta.touched && field.meta.error ? 'invalid' : ''}
		/>
	</div>
);

export default InputField;
