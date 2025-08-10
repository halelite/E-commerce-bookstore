import Layout from "../components/Layout";

function Contact() {
	return (
		<Layout>
			<div className="contact-us">
				<div className="top-title">تماس با ما</div>

				<div className="paragraph">
					ما در BookLand همیشه خوشحال می‌شویم که نظرات، پیشنهادات یا سوالات شما
					را بشنویم. در حال حاضر این پروژه به عنوان یک نمونه‌ی شخصی توسعه داده
					شده است.
				</div>

				<div className="paragraph">
					برای مشاهده کدهای پروژه یا ارتباط با توسعه‌دهنده، می‌توانید به{" "}
					<a href="" target="__blank">
						صفحه گیت‌هاب من
					</a>{" "}
					مراجعه کنید.
				</div>
			</div>
		</Layout>
	);
}

export default Contact;
