import React, { useEffect } from 'react';
import Footer from '../Shared/Footer/Footer';
import { useForm } from 'react-hook-form';
import { FaMapMarkerAlt, FaEnvelope, FaPhoneAlt, FaClock, FaPaperPlane } from 'react-icons/fa';
import Header from '../Shared/Header/Header';
import './Contact.css';
import SubHeader from '../Shared/SubHeader';
import { useContactMutation } from '../../redux/api/contactApi';
import { message } from 'antd';

const Contact = () => {
	const [contact, { isLoading, isError, error, isSuccess }] = useContactMutation();
	const { register, handleSubmit, reset, formState: { errors } } = useForm();

	const onSubmit = (data) => {
		contact(data);
	};

	useEffect(() => {
		if (isSuccess) {
			message.success('Message sent successfully!');
			reset();
		}
		if (isError && error) {
			message.error(error?.data?.message || 'Failed to send message');
		}
	}, [isSuccess, isError, error, reset]);

	const contactInfo = [
		{
			icon: <FaMapMarkerAlt />,
			title: 'Visit us',
			content: 'Laggere ring road, choudeshwari nagar, Bangalore 560058'
		},
		{
			icon: <FaPhoneAlt />,
			title: 'Call us',
			content: '+91 8495055633',
			link: 'tel:+91 8495055633'
		},
		{
			icon: <FaEnvelope />,
			title: 'Email us',
			content: 'manjugoni633@gmail.com',
			link: 'mailto:manjugoni633@gmail.com'
		},
		{
			icon: <FaClock />,
			title: 'Working hours',
			content: 'Mon - Sat: 9:00 AM - 6:00 PM'
		}
	];

	return (
		<>
			<Header />
			<SubHeader title="Contact us" subtitle="We're here to help and answer any questions" />

			<section className="contact-section">
				<div className="container">
					<div className="row g-5">
						<div className="col-lg-5">
							<div className="contact-info-wrapper">
								<span className="contact-label">Get in touch</span>
								<h2 className="contact-heading">Let's talk about your health</h2>
								<p className="contact-text">
									Have questions or need to schedule an appointment? We're here to help. 
									Reach out to us through any of the following methods.
								</p>

								<div className="contact-info-cards">
									{contactInfo.map((info, index) => (
										<div className="contact-info-card" key={index}>
											<div className="contact-info-icon">{info.icon}</div>
											<div>
												<h5>{info.title}</h5>
												{info.link ? (
													<a href={info.link} className="contact-info-link">{info.content}</a>
												) : (
													<p>{info.content}</p>
												)}
											</div>
										</div>
									))}
								</div>
							</div>
						</div>

						<div className="col-lg-7">
							<div className="contact-form-wrapper">
								<h3>Send us a message</h3>
								<p className="contact-form-subtitle">Fill out the form below and we'll get back to you soon.</p>

								<form onSubmit={handleSubmit(onSubmit)} className="contact-form">
									<div className="row g-3">
										<div className="col-md-6">
											<div className="form-group">
												<label>First name <span className="required">*</span></label>
												<input
													{...register('firstName', { required: 'First name is required' })}
													type="text"
													className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
													placeholder="John"
												/>
												{errors.firstName && <span className="invalid-feedback">{errors.firstName.message}</span>}
											</div>
										</div>
										<div className="col-md-6">
											<div className="form-group">
												<label>Last name <span className="required">*</span></label>
												<input
													{...register('lastName', { required: 'Last name is required' })}
													type="text"
													className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
													placeholder="Doe"
												/>
												{errors.lastName && <span className="invalid-feedback">{errors.lastName.message}</span>}
											</div>
										</div>
										<div className="col-md-12">
											<div className="form-group">
												<label>Email address <span className="required">*</span></label>
												<input
													{...register('email', {
														required: 'Email is required',
														pattern: { value: /^\S+@\S+$/i, message: 'Invalid email' }
													})}
													type="email"
													className={`form-control ${errors.email ? 'is-invalid' : ''}`}
													placeholder="john.doe@example.com"
												/>
												{errors.email && <span className="invalid-feedback">{errors.email.message}</span>}
											</div>
										</div>
										<div className="col-md-12">
											<div className="form-group">
												<label>Subject <span className="required">*</span></label>
												<input
													{...register('subject', { required: 'Subject is required' })}
													type="text"
													className={`form-control ${errors.subject ? 'is-invalid' : ''}`}
													placeholder="How can we help you?"
												/>
												{errors.subject && <span className="invalid-feedback">{errors.subject.message}</span>}
											</div>
										</div>
										<div className="col-md-12">
											<div className="form-group">
												<label>Message <span className="required">*</span></label>
												<textarea
													{...register('text', { required: 'Message is required' })}
													className={`form-control ${errors.text ? 'is-invalid' : ''}`}
													rows="6"
													placeholder="Tell us more about your inquiry..."
												/>
												{errors.text && <span className="invalid-feedback">{errors.text.message}</span>}
											</div>
										</div>
									</div>

									<button type="submit" className="contact-submit-btn" disabled={isLoading}>
										{isLoading ? (
											'Sending...'
										) : (
											<>
												<FaPaperPlane /> Send message
											</>
										)}
									</button>
								</form>
							</div>
						</div>
					</div>
				</div>
			</section>

			<section className="contact-map">
				<div className="container">
					<iframe
						src="https://www.google.com/maps/place/Laggere,+Bengaluru,+Karnataka/@13.0090239,77.5243895,16z/data=!3m1!4b1!4m6!3m5!1s0x3bae3da827681b23:0x31cda8d5f5fafc26!8m2!3d13.0097647!4d77.5253962!16s%2Fg%2F1hjglts3k?entry=ttu&g_ep=EgoyMDI2MTAwNi4wIKXMDSoASAFQAw%3D%3D"
						width="100%"
						height="450"
						style={{ border: 0, borderRadius: '20px' }}
						allowFullScreen=""
						loading="lazy"
						title="Google Maps"
					/>
				</div>
			</section>

			<Footer />
		</>
	);
};

export default Contact;
