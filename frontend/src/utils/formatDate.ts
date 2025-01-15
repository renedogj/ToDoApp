export const ddMMHHmm24: Intl.DateTimeFormatOptions = {
	day: '2-digit',
	month: 'long',
	hour: '2-digit',
	minute: '2-digit',
	hourCycle: 'h23',
};

export const ddMM24: Intl.DateTimeFormatOptions = {
	day: '2-digit',
	month: 'long',
	hourCycle: 'h23',
};

export const HHmm24: Intl.DateTimeFormatOptions = {
	hour: '2-digit',
	minute: '2-digit',
	hourCycle: 'h23',
};

export const formatDate = (date: any, formatOptions?: Intl.DateTimeFormatOptions) => {
	if (date != null && date != "") {
		return new Intl.DateTimeFormat('es-ES', formatOptions).format(new Date(date));
	} else {
		return new Intl.DateTimeFormat('es-ES', formatOptions).format(new Date());
	}
};