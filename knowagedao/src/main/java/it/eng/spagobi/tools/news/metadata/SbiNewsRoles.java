/*
 * Knowage, Open Source Business Intelligence suite
 * Copyright (C) 2018 Engineering Ingegneria Informatica S.p.A.
 *
 * Knowage is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Knowage is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

package it.eng.spagobi.tools.news.metadata;

import it.eng.spagobi.commons.metadata.SbiExtRoles;
import it.eng.spagobi.commons.metadata.SbiHibernateModel;

public class SbiNewsRoles extends SbiHibernateModel {

	/**
	 *
	 */
	private static final long serialVersionUID = 1L;
	private SbiNewsRolesId newsRolesId;
	private SbiNews sbiNews;
	private SbiExtRoles sbiExtRoles;

	public SbiNewsRoles() {

	}

	public SbiNewsRoles(SbiNewsRolesId newsRolesId, SbiNews sbiNews, SbiExtRoles sbiExtRoles) {
		this.newsRolesId = newsRolesId;
		this.sbiNews = sbiNews;
		this.sbiExtRoles = sbiExtRoles;
	}

	public SbiNewsRolesId getNewsRolesId() {
		return newsRolesId;
	}

	public void setNewsRolesId(SbiNewsRolesId newsRolesId) {
		this.newsRolesId = newsRolesId;
	}

	public SbiNews getSbiNews() {
		return sbiNews;
	}

	public void setSbiNews(SbiNews sbiNews) {
		this.sbiNews = sbiNews;
	}

	public SbiExtRoles getSbiExtRoles() {
		return sbiExtRoles;
	}

	public void setSbiExtRoles(SbiExtRoles sbiExtRoles) {
		this.sbiExtRoles = sbiExtRoles;
	}

}
